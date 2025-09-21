import { Component, OnInit, Input, SimpleChanges, Output, OnChanges, EventEmitter } from '@angular/core';
import { FirstDataRenderedEvent, GridApi, RowModelType } from '@ag-grid-community/core';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component'
import { SelectRendererComponent } from '../select-renderer/select-renderer.component';
import { SwitchInputBtnCellRendererComponent } from '../switch-input-btn-cell-renderer/switch-input-btn-cell-renderer.component';
import { color } from 'echarts';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InputfieldRendererComponent } from '../inputfield-renderer/inputfield-renderer.component';
import { UtilityFunctions } from '../../utilities/utility-func';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'esop-ag-grid-table',
	templateUrl: './ag-grid-table.component.html',
	styleUrls: ['./ag-grid-table.component.scss']
})
export class AgGridTableComponent implements OnInit, OnChanges {


	@Input() agGridOptions: any = {};
	@Input() infiniteScroll: any;
	public destroy$: Subject<boolean> = new Subject<boolean>();
	public gridApi!: GridApi;
	public gridColumnApi: any;
	public externalSearch: any;
	public search: any;
	public rowModelType!: RowModelType;
	public overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
	public overlayNoRowsTemplate = '<span class="ag-overlay-loading-center">No record(s) found </span>';
	@Input() clickableColumns: any = [];
	@Output() aggridEmitter = new EventEmitter();
	@Output() nearestValueEmitter = new EventEmitter();
	@Input() permissionsPage: any;
	@Input() theme: any;
	@Input() Height: any;
	@Input() tableState: any;
	@Input() enableAutoResize = false;
	@Input() rowHoverSub!: Subject<any>;
	@Input() wId: any;
	@Input() clientSide: any = false;
	public firstTime: any = true;
	@Input() searchEnabled: boolean = true;
	@Input() isButtonVisible: boolean = true;

	constructor(private _util: UtilityFunctions,private http: HttpClient) { }

	ngOnInit(): void {
		if (this.infiniteScroll) {
			this.rowModelType = 'infinite';
		}
		this.clickableColumns = [...this.clickableColumns];
		this.subscribeToHOverActions();
	}
	ngOnChanges(changes: SimpleChanges) {
		if (changes) {
			if (changes['agGridOptions']) {
				this.firstTime = true;
				this.setColumnsClick();
			}
			this.updateAggridData();
		}
		if (changes['clickableColumns'] && changes['clickableColumns'].previousValue !== changes['clickableColumns'].currentValue) {
			this.clickableColumns = [...this.clickableColumns];
		}
		if (changes['clickableColumns']) {
			this.setColumnsClick();
		}
	}
	updateAggridData() {
		try {
			if (this.agGridOptions?.enableActions && this.agGridOptions?.tableActions?.actions?.length) {
				const index = this.agGridOptions.columnDefs.findIndex((el: any) => el.cellRenderer === 'buttonRenderer');
				if (index === -1) {
					this.agGridOptions.columnDefs.push({
						headerName: 'Actions',
						cellRenderer: BtnCellRendererComponent,
						floatingFilter: false,
						suppressCsvExport: true,
						editable: false,
						sortable: false,
						cellRendererParams: {
							onClick: this.onBtnClick.bind(this),
							actions: this.agGridOptions?.tableActions?.actions || []
						},
						suppressSizeToFit: true,
					});
				}
			}
			if (this.agGridOptions?.columnDefs?.length) {
				this.agGridOptions.columnDefs.forEach((ele: any) => {
					if (ele?.colorKey) {
						ele.cellStyle = this.cellStyleData;
					}
				})
			}
			this.aggridEmitter.emit({ 'action': { enableSorting: true }});
			if (this.agGridOptions) {
				if (!this.agGridOptions?.frameworkComponents) {
					this.agGridOptions.frameworkComponents = {};
				}
				this.agGridOptions['frameworkComponents'] = {
					buttonRenderer: BtnCellRendererComponent,
					selectRenderer: SelectRendererComponent,
					switchInputRenderer: SwitchInputBtnCellRendererComponent,
					inputRenderer: InputfieldRendererComponent
				};
				this.agGridOptions = { ...this.agGridOptions };
			}
		} catch (updateErr) {
			console.error(updateErr);
		}
	}
	onGridReady(params: any) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		this.applyTableState();
		this.getTableState();
		if (!this.infiniteScroll) {
			return;
		}
		const self = this;
		const dataSource: any = {
			rowCount: null,
			getRows: (params: any) => {
				let payload: any = {
					startRow: params.startRow,
					endRow: params.endRow,
					page: params.endRow / (params.endRow - params.startRow),
					records: (params.endRow - params.startRow),
					sortModel: {},
				};
				if (self.clientSide) {
					payload['pagination'] = false;
				}
				if (params?.sortModel?.length) {
					payload['sortModel'] = params['sortModel'][0];
				}
				if (self.agGridOptions.payload) {
					payload = { ...payload, ...self.agGridOptions.payload };
				}
				self.gridApi.showLoadingOverlay();
				// self.appservice[self.agGridOptions.dataMethod](payload).pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
					this.http.get('assets/json/assetData.json').pipe(takeUntil(this.destroy$)).subscribe((resp: any) => {
					if (resp && resp.status === 'success') {
						let rowsThisPage = [];
						if (resp.data.table_data.rowData) {
							rowsThisPage = resp.data.table_data.rowData;
						}
						if (resp?.total_no) {
							self.agGridOptions['context'] = resp.total_no || 0;
						}
						if (self.agGridOptions.updateColDefs) {
							self.gridApi.setColumnDefs(this.setColumnsClick(this.agGridOptions?.columnDefs || []));
							self.agGridOptions.updateColDefs = false;
						}
						self.gridApi.hideOverlay();
						self.agGridOptions['rowData'] = rowsThisPage;
						if (!rowsThisPage.length) {
							self.gridApi.showNoRowsOverlay();
						}
						if (this.firstTime) {
							this.applyTableState();
							this.firstTime = false;
						}
						params.successCallback(rowsThisPage, (resp?.end_of_records || resp?.endOfRecords || resp?.endofrecords) ? resp.total_no : -1);
					} else {
						self.gridApi.hideOverlay();
						params.failCallback();
					}
				}, (error) => {
					self.gridApi.hideOverlay();
					params.failCallback();
					console.error(error);
				});
			},
		};
		this.gridApi.setDatasource(dataSource);
		setTimeout(() => {
			this.gridApi.setGetRowStyle(this.getCalcRowStyle.bind(this))
		}, 1000);
	}

	onGlobalLevelSearch() {
		this.gridApi.setQuickFilter(
			this.search
		)
	}

	onFirstDataRendered(params: FirstDataRenderedEvent) {
		params.api.sizeColumnsToFit();
	}

	setColumnsClick(headerData?: any) {
		try {
			if (!this.clickableColumns?.length) {
				return;
			}
			if (headerData) {
				if (headerData?.length) {
					for (const eachItem of this.clickableColumns) {
						const eleInd = headerData.findIndex((ele: any) => ele?.field === eachItem || ele?.key === eachItem || ele?.value === eachItem);
						if (eleInd > -1) {
							headerData[eleInd]['cellRenderer'] = this.anchorTagCR;
						}
					}
				}
				return headerData;
			}
			if (!this.agGridOptions?.columnDefs?.length) {
				return;
			}
			for (const eachItem of this.clickableColumns) {
				const eleInd = this.agGridOptions.columnDefs.findIndex((ele: any) => ele?.field === eachItem || ele?.key === eachItem || ele?.value === eachItem);
				if (eleInd > -1) {
					this.agGridOptions.columnDefs[eleInd]['cellRenderer'] = this.anchorTagCR;
				}
			}
			this.agGridOptions = { ...this.agGridOptions };
		} catch (columnErr) {
			console.error(columnErr);
		}
	}

	onBtnClick(data: any) {
		if (!data.data) {
			return;
		}
		this.aggridEmitter.emit(data);
	}

	changeActions(eachData: any) {
		if (eachData?.type === 'download') {
			const allColumns = this.gridColumnApi.getAllGridColumns();
			const exportableColumnKeys = allColumns.filter(col =>
				col.getColDef().headerName &&
				col.getColDef().headerName.trim() !== '' &&
				col.getColDef().headerName !== 'Actions'
			).map(col => col.getColId());
			this.gridApi.exportDataAsCsv(this.getDownloadParams(eachData, exportableColumnKeys));
			return;
		}
		this.aggridEmitter.emit({
			action: eachData
		})
	}

	getDownloadParams(eachData: any, exportableColumnKeys: any) {
		return {
			fileName: eachData?.fileName || 'export',
			columnKeys: exportableColumnKeys
		};
	}

	onCellClicked(e: any) {
		try {
			if (!e?.colDef?.field || !(this.clickableColumns?.length) || !(this.clickableColumns.includes(e.colDef.field))) {
				return;
			}
			if (e?.data?.disabledActions?.length && e?.data?.disabledActions?.includes(e?.colDef?.['action']?.['action'] || 'edit')) {
				return;
			}
			const emitpayload: any = {
				action: e?.colDef?.action || {
					action: 'edit',
					type: 'edit'
				},
				data: e.data,
				rowIndex: e.rowIndex,
			};
			this.aggridEmitter.emit(emitpayload);
		} catch (cellErr) {
			console.error(cellErr);
		}
	}

	anchorTagCR(params: any) {
		if (params.value === undefined || params.value === null || !params?.data) {
			return '';
		}
		return `<a href="javascript:void(0)" class="${(params?.data?.disabledActions?.length && params?.data?.disabledActions?.includes(params?.colDef?.['action']?.['action'] || 'edit')) ? 'color-black no-decoration cursor-unset' : ''}" title="${params.value}">${params.value} ${ params?.colDef?.fieldIcon ? '<i class="mr-2 '+params?.colDef?.fieldIcon + '"></i>':''}</a>`;
	}

	cellStyleData(params: any) {
		if (!params?.data || !params?.colDef?.['colorKey']) {
			return {};
		}
		let styles: any = {
			backgroundColor: params?.data?.[params?.colDef?.['colorKey']],
		};
		const inputColor = styles['backgroundColor'];
		const rgb = (typeof inputColor === 'string') ? color?.parse(inputColor) : inputColor;
		const luma = (0.2126 * rgb?.[0]) + (0.7152 * rgb?.[1]) + (0.0722 * rgb?.[2]) || 0;
		styles['color'] = (luma >= 165) ? '#000' : '#fff';
		return styles;
	}

	getTableState() {
		return this.gridColumnApi?.getColumnState() || [];
	}

	applyTableState() {
		if (this?.tableState?.length) {
			this.gridColumnApi.applyColumnState({ state: this.tableState, applyOrder: true });
		}
	}
	onModelUpdated() {
		if (this.enableAutoResize) {
			this.autoSizeAll();
		}
	}
	autoSizeAll() {
		const allColumnIds: any[] = [];
		// tslint:disable-next-line:only-arrow-functions
		this.gridColumnApi.getAllColumns().forEach(function (column: { colId: string; }) {
			allColumnIds.push(column.colId);
		});
		this.gridColumnApi.autoSizeColumns(allColumnIds);
	}

	public refKeyValue: string | number | null | undefined;
	public refKey!: string | number;
	onCellMouseOver(event: any) {
		if (this.rowHoverSub) {
			this.aggridEmitter.emit({ action: 'rowHover', data: event.data, rowIndex: event.rowIndex, wId: this.wId });
		}
	}
	onCellMouseOut(event: any) {
		if (this.rowHoverSub) {
			this.aggridEmitter.emit({ action: 'rowOut', data: event.data, rowIndex: event.rowIndex, wId: this.wId });
		}
	}

	subscribeToHOverActions() {
		if (!this.rowHoverSub) { return; }
		this.rowHoverSub.subscribe(e => {
			this.refKey = e.refKey;
			this.refKeyValue = e.data ? this._util.findNearest(this.agGridOptions['rowData'], e.data[e.refKey], e.refKey) : null;
			this.nearestValueEmitter.emit({ data: e.data, nearestData: this.refKeyValue, type: this.refKey ? 'over' : 'out' });
			if (!this._util.onlyNumbersAndAlphabets(this.refKeyValue)) { this.gridApi.redrawRows(); }
			if (e.refKey && e.data && [NaN, '', null, undefined].indexOf(e.data[e.refKey]) === -1) {
				const self = this;
				setTimeout(function () {
					if (e.refKey) {
						if (e.wId !== self.wId) {
							self.gridApi.ensureNodeVisible((node: { data: { [x: string]: any; }; }) => node?.data && node?.data[e.refKey] === self.refKeyValue, 'middle');
						}
						self.gridApi.redrawRows();
					}
				}, 0);
			}
		});
	}

	getCalcRowStyle(params: { node: { data: { [x: string]: any; }; }; }) {
		return { 'background-color': [NaN, '', null, undefined].indexOf(this.refKeyValue) === -1 && params?.node?.data?.[this.refKey] === this.refKeyValue ? 'rgb(122, 223, 122)' : null };
	}
	
	ngOnDestroy() {
		this.destroy$.next(true);
		this.destroy$.complete();
		this.destroy$.unsubscribe();
	  }
}
