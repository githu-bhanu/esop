// tslint:disable: trailing-comma max-line-length component-selector no-increment-decrement prefer-template no-parameter-reassignment
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
// import { EmptyStateDataConf } from '@ut/components';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { StorageListenerService } from '../../../services/storage-listener.service';

@Component({
  selector: 'esop-simple-table-with-pagination',
  templateUrl: './simple-table-with-pagination.component.html',
  styleUrls: ['./simple-table-with-pagination.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush /* This is a strategy to detect changes by  */,
})
export class SimpleTableWithPaginationComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  @Input() tableDataWithActions;
  @Input() maxHeight;
  @Input() customId;
  @Input() calculatedHeight;
  @Input() mobileCalculatedHeight;
  @Input() hideFields;
  @Output() actionEmitter = new EventEmitter();
  @Input() autoRowHeight = false;
  public displayColumns: any = [];
  // public emptyData: EmptyStateDataConf;
  public mediaBreakPoint: any;
  public mobileDisplayColumns: any = [];
  public metaData = {
    searchText: null,
    counter: 1,
    no_of_steps: 1,
    no_of_items_to_display: 10,
    display_options: [],
    buttonTypes: ['import', 'view', 'addnew', 'general'],
    virtual_scroll_status: true,
    minBufferPx: 300,
    maxBufferPx: 400,
    scroll_height: 0,
    today: new Date(),
    headerInLineStyle: '0px',
    enableSearchable: true,
    unHiddenActions: true,
    maxHeightInPx: '300px',
    scroll_height_px: '0px',
    records: 50,
  };
  public defaultDisplayOptions = [
    {
      label: '5',
      value: 5,
    },
    {
      label: '10',
      value: 10,
    },
    {
      label: '25',
      value: 25,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '100',
      value: 100,
    },
  ];
  public infiniteScrollDisplayOptions = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '25',
      value: 25,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '100',
      value: 100,
    },
    {
      label: '200',
      value: 200,
    },
  ];
  public downloadObj = {};
  public checkDownloadLoader = false;
  public seggregatedTableContent = [];
  public filterObject: any = {};
  public selectedView = 'tableView';
  public filteredData: any = [];
  public searchInputChanges = new Subject<any>();
  public columnLevelFilters = new Subject<any>();
  public changeInTableData = new Subject<any>();
  public mediaResolutionSubscription: Subscription;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public settingsForColumns = { // multi select settings
    labelKey: 'label',
    primaryKey: 'key',
    singleSelection: false,
    text: 'Select',
    badgeShowLimit: 3,
    enableCheckAll: false,
    enableSearchFilter: false,
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    lazyLoading: true
  };
  sortData = {
    asc: false,
    key: null,
  };
  public loaders = {
    seggregateData: false,
  };

  public tooltipContent: any = null;
  public keyRegex: any = /^([a-zA-Z0-9_ -])*$/;
  constructor(public _session: StorageListenerService) { }

  ngOnInit() {
    this.searchInputChanges.pipe(
      debounceTime(1400),
    ).subscribe((result) => {
      this.tableDataWithActions['counter'] = 0;
      this.onGlobalSearchChanges();
    });
    this.columnLevelFilters
      .pipe(debounceTime(1000))
      .subscribe((resp) => {
        this.implementColumnLevelSearch();
      });
    this.changeInTableData
      .pipe(debounceTime(50))
      .subscribe((resp) => { 
        this.checkIfScrollExists();
      });
      this.mediaBreakPoint = localStorage.getItem('mediaBreakPoint');
      if (['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1) {
        this.mobileViewHeader();
      }
    this.mediaResolutionSubscription = this._session.watchStorage().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.mediaBreakPoint = data;
      if ((['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
        this.mobileViewHeader();
      }
    });
  }
  ngAfterViewInit() {
    this.updateTableData();
    if ((['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
      this.mobileViewHeader();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maxHeight']?.['currentValue']) {
      this.metaData['maxHeightInPx'] = changes['maxHeight']['currentValue'] + 'px';
    }
    this.updateTableData();
    if ((['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
      this.mobileViewHeader();
    }
  }
  /**
   * method to configure empty Data
   */
  // setEmptyData() {
  //   this.emptyData = {
  //     image: {
  //       rounded: false,
  //       show: true,
  //       url: 'assets/images/logo.png',
  //       width: '400',
  //     },
  //   };
  // }
  onChangeInDisplay() {
    try {
      if (this.tableDataWithActions['table_type'] === 'client_side') {
        this.metaData['counter'] = 1;
        this.seggregateTableData(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  onChangeInCounter(type) {
    if (type === 'increase') {
      if (this.metaData['counter'] < this.seggregatedTableContent.length) {
        this.metaData['counter'] = this.metaData['counter'] + 1;
        this.changeInTableData.next(null);
      }
    } else if (type === 'decrease') {
      if (this.metaData['counter'] > 1) {
        this.metaData['counter'] = this.metaData['counter'] - 1;
        this.changeInTableData.next(null);
      }
    }
  }
  seggregateTableData(isChangeInDropdown?: any) {
    try {
      this.seggregatedTableContent = [];
      if (!this.tableDataWithActions?.['tableData']?.['bodyContent']) {
        return;
      }
      const bodyContentLength = this.tableDataWithActions['tableData']['bodyContent'].length;
      this.updateSeggregationTableOptions(bodyContentLength);
      if (!isChangeInDropdown) {
        this.metaData.no_of_items_to_display = bodyContentLength;
      }
      if (bodyContentLength) {
        const fullBodyLengthDispOpt = {
          label: 'All',
          value: bodyContentLength,
        };
        this.metaData['display_options'].push(fullBodyLengthDispOpt);
        this.metaData['no_of_steps'] = Math.ceil(bodyContentLength / this.metaData['no_of_items_to_display']);
        for (let eachStep = 1; eachStep <= this.metaData['no_of_steps']; eachStep++) {
          const eachStepArray = [];
          const fromIndex = (eachStep - 1) * this.metaData['no_of_items_to_display'];
          const toIndex = eachStep * this.metaData['no_of_items_to_display'] - 1;
          const filteredData = JSON.parse(JSON.stringify(this.filteredData));
          filteredData.forEach((eachItem, index) => {
            if (index >= fromIndex && index <= toIndex) {
              eachStepArray.push(eachItem);
            }
          });
          this.seggregatedTableContent.push(eachStepArray);
        }
        this.seggregatedTableContent = this.seggregatedTableContent.filter((eachStep) => {
          if (eachStep.length) {
            eachStep = eachStep.filter((subStep) => {
              return (subStep !== null && subStep !== '' && subStep !== undefined);
            });
          }
          return (eachStep !== null && eachStep !== '' && eachStep !== undefined);
        });
        this.changeInTableData.next(null);
      }
      this.seggregatedTableContent = this.seggregatedTableContent.filter(eachItem => eachItem?.length);
      this.seggregatedTableContent = [...this.seggregatedTableContent];
    } catch (error) {
      console.error(error);
    }
  }
  emitAction(actionType, data?: any, rowIndex?: any, value?: any, clickEvent?: any) {
    try {
      if (clickEvent && this.tableDataWithActions.enableRowClick) {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
      }
      const dataToEMit = {
        action: actionType,
        tableData: {
          bodyContent: this.filteredData,
          headerContent: this.tableDataWithActions['tableData']['headerContent'],
        },
      };
      if (data) {
        dataToEMit['data'] = data;
      }
      if (rowIndex !== undefined) {
        if (this.tableDataWithActions['table_type'] === 'client_side') {
          const clickedInd = (this.metaData['counter'] - 1) * this.metaData['no_of_items_to_display'] + rowIndex;
          dataToEMit['rowIndex'] = clickedInd;
        } else {
          dataToEMit['rowIndex'] = rowIndex;
        }
      }
      if (value !== undefined) {
        dataToEMit['value'] = value;
      }
      this.actionEmitter.emit(dataToEMit);
    } catch (error) {
      console.error(error);
    }
  }

  get searchTerm(): string {
    return this.metaData['searchText'];
  }

  /**
   * ### Method to setting the table data based on the string entered
   */
  set searchTerm(value: string) {
    try {
      this.metaData['searchText'] = value;
      if (!this.tableDataWithActions?.['tableData']?.['headerContent']) {
        return;
      }
      const headerContent = this.tableDataWithActions['tableData']['headerContent'];
      if (!this.tableDataWithActions['hideSearch']) {
        this.filterObject = {};
        for (const item of headerContent) {
          this.filterObject[item['key'] || item['value']] = this.metaData['searchText'];
        }
      }
      if (this.tableDataWithActions['table_type'] === 'infinite_scroll') {
        if (this.tableDataWithActions['server_search']) {
          this.searchInputChanges.next(null);
          return;
        }
      }
      this.filteredData = this.filterdata(value);
      this.filteredData = [...this.filteredData];
      if (this.tableDataWithActions['table_type'] === 'client_side') {
        this.seggregateTableData();
        this.metaData['counter'] = 1;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * #### Method to filter the data based on search string entered and updating the table data
   * @param searchString refernce of search string entered inside the search field
   */
  filterdata(searchString: string) {
    try {
        return this.tableDataWithActions['tableData']['bodyContent'].filter((eachItem) => {
        let searchStringFound = false;
        this.tableDataWithActions['tableData']['headerContent'].forEach((eachHeader) => {
          if (eachItem[eachHeader['key'] || eachHeader['value']]) {
            if (['string'].includes(typeof eachItem[eachHeader['key'] || eachHeader['value']])) {
              if (eachItem[eachHeader['key'] || eachHeader['value']].toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                searchStringFound = true;
                return eachItem;
              }
            } else if (eachItem[eachHeader['key'] || eachHeader['value']] == searchString) {
                searchStringFound = true;
                return eachItem;
            }
          }
        });
        if (searchStringFound) {
          return eachItem;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  setFilterData() {
    try {
      if (this.tableDataWithActions['tableData']?.['bodyContent']) {
        this.filteredData = JSON.parse(JSON.stringify(this.tableDataWithActions['tableData']['bodyContent']));
        this.filteredData = this.filteredData || [];
        if (this.maxHeight) {
          this.metaData['scroll_height'] = (this.filteredData.length * 45 > (this.maxHeight || 300)) ? this.maxHeight || 300 : this.filteredData.length * 45;
          if (this.tableDataWithActions.enableRowExpand) {
            this.metaData['scroll_height'] = this.metaData['scroll_height'] + 140;
          }
          this.metaData['scroll_height_px'] = this.metaData['scroll_height'] + 'px';
        } else if (this.mediaBreakPoint && (['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
          const availableHeight = window.innerHeight;
          let cdkHeight = 0;
          if (!this.mobileCalculatedHeight) {
            this.mobileCalculatedHeight = 272;
          }
          cdkHeight = this.mobileCalculatedHeight + cdkHeight;
          if (this.tableDataWithActions.enableRowExpand) {
            cdkHeight = cdkHeight - 140;
          }
          const calculatedHeight = this.filteredData.length * 45 > (availableHeight - cdkHeight) ? 'calc(100vh - ' + cdkHeight + 'px)' : 'calc(100vh - ' + (availableHeight - this.filteredData.length * 45) + 'px)';
          this.metaData['scroll_height_px'] = calculatedHeight;
        } else if (this.calculatedHeight !== undefined) {
          const availableHeight = window.innerHeight;
          let cdkHeight = 0;
          cdkHeight = this.calculatedHeight + cdkHeight;
          let calculatedHeight;
          if (this.tableDataWithActions.enableRowExpand) {
            cdkHeight = cdkHeight - 140;
          }
          if (this.autoRowHeight) {
            calculatedHeight = 'calc(100vh - ' + cdkHeight + 'px)';
          } else {
            calculatedHeight = this.filteredData.length * 45 > (availableHeight - cdkHeight) ? 'calc(100vh - ' + cdkHeight + 'px)' : 'calc(100vh - ' + (availableHeight - this.filteredData.length * 45) + 'px)';
          }
          this.metaData['scroll_height_px'] = calculatedHeight;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  updateTilesInTable() {
    try {
      this.tableDataWithActions['table_type'] = this.tableDataWithActions['table_type'] || 'client_side';
      if (this.tableDataWithActions['tableActions']?.['actions']?.length) {
        this.metaData['unHiddenActions'] = this.tableDataWithActions['tableActions']['actions'].some(eachItem => !eachItem['hidden']);
      } else {
        this.metaData['unHiddenActions'] = false;
      }
      if (this.tableDataWithActions['tableData']?.['headerContent']) {
        this.displayColumns = this.tableDataWithActions['tableData']['headerContent'].filter(eachItem => !eachItem['optional_header']);
        this.tableDataWithActions['paramters_available'] = this.tableDataWithActions['tableData']['headerContent'].some(item => item['parameters']?.length);
        for (const eachHeader of this.tableDataWithActions['tableData']['headerContent']) {
          if (!eachHeader['parameters']) {
            eachHeader['colspan'] = 1;
            eachHeader['rowspan'] = this.tableDataWithActions['paramters_available'] ? 2 : 1;
          } else {
            eachHeader['colspan'] = eachHeader['parameters'].length;
            eachHeader['rowspan'] = 1;
          }
          if (eachHeader['type'] === 'tile') {
            for (const eachItem of this.tableDataWithActions['tableData']['bodyContent']) {
              if (eachItem[eachHeader['key'] || eachHeader['value']]) {
                if (eachItem[eachHeader['key'] || eachHeader['value']].length && Array.isArray(eachItem[eachHeader['key'] || eachHeader['value']])) {
                  const lengthOftile = eachItem[eachHeader['key'] || eachHeader['value']].length;
                  eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])] = [];
                  if (lengthOftile > 3) {
                    eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])] = JSON.parse(JSON.stringify(eachItem[eachHeader['key'] || eachHeader['value']]));
                    const availableItems = eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])].splice(2);
                    const restOfItemLength = availableItems.length;
                    eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])].push(restOfItemLength.toString());
                  }
                } else if (eachItem[eachHeader['key'] || eachHeader['value']].length && !Array.isArray(eachItem[eachHeader['key'] || eachHeader['value']])) {
                  const tileData = [JSON.parse(JSON.stringify(eachItem[eachHeader['key'] || eachHeader['value']]))];
                  const lengthOftile = tileData.length;
                  eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])] = [];
                  if (lengthOftile > 3) {
                    eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])] = JSON.parse(JSON.stringify(tileData));
                    const availableItems = eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])].splice(2);
                    const restOfItemLength = availableItems.length;
                    eachItem['tileData' + (eachHeader['key'] || eachHeader['value'])].push(restOfItemLength.toString());
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  eachItemClick(header, clickedItem, rowIndex, clickEvent?: any) {
    try {
      if (clickedItem?.[header?.['disableClick']]) {
        return;
      }
      if (header['enableClick']) {
        if (clickEvent) {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
        }
        const dataToEMit = {
          action: header['action'] ? header['action'] : {},
        };
        if (clickedItem) {
          dataToEMit['data'] = clickedItem;
        }
        if (rowIndex !== undefined) {
          if (this.tableDataWithActions['table_type'] === 'client_side') {
            const clickedInd = (this.metaData['counter'] - 1) * this.metaData['no_of_items_to_display'] + rowIndex;
            dataToEMit['rowIndex'] = clickedInd;
          } else {
            dataToEMit['rowIndex'] = rowIndex;
          }
        }
        this.actionEmitter.emit(dataToEMit);
      }
    } catch (error) {
      console.error(error);
    }
  }
  updateTableData() {
    try {
      this.metaData['counter'] = this.metaData['counter'] || 1;
      this.tableDataWithActions['table_type'] = this.tableDataWithActions['table_type'] || 'client_side';
      this.tableDataWithActions = { ...this.tableDataWithActions };
      this.setFilterData();
      this.updateFilterObj();
      if (this.tableDataWithActions['table_type'] === 'client_side') {
        this.seggregateTableData();
      }
      this.updateTilesInTable();
      if (this.metaData['searchText']) {
        if (!this.tableDataWithActions['server_search']) {
          this.filteredData = this.filterdata(this.metaData['searchText']);
          if (this.tableDataWithActions['table_type'] === 'client_side') {
            this.seggregateTableData();
          }
        }
      }
      this.filteredData = [...this.filteredData];
      this.changeInTableData.next(null);
    } catch (error) {
      console.error(error);
    }
  }
  updateFilterObj() {
    try {
      if (this.tableDataWithActions['table_state'] === 'init' && this.tableDataWithActions['server_search']) {
        this.filterObject = this.tableDataWithActions['default_filters'] || {};
      }
    } catch (error) {
      console.error(error);
    }
  }
  onScrollDown = () => {
    try {
      const availableFilterObj = { ...this.filterObject };
      this.updateFilters(availableFilterObj, '');
      this.tableDataWithActions['counter'] = this.tableDataWithActions['counter'] ? this.tableDataWithActions['counter'] + 1 : 1;
      if (!this.tableDataWithActions['endOfRecords'] && !this.tableDataWithActions['loader_status']) {
        const actionToEmit = {
          action: {
            action: 'scroll',
            type: 'scroll',
            page: this.tableDataWithActions['counter'],
            records: this.metaData['records'] || 50,
            search: this.searchTerm,
            filters: availableFilterObj,
            metaData: this.getHeaderMetaData(),
          }
        };
        this.actionEmitter.emit(actionToEmit);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onGlobalSearchChanges = () => {
    try {
      const availableFilterObj = { ...this.filterObject };
      this.tableDataWithActions['counter'] = 1;
      if (!this.tableDataWithActions['endOfRecords'] && !this.tableDataWithActions['loader_status']) {
        const actionToEmit = {
          action: {
            action: 'search',
            type: 'search',
            page: this.tableDataWithActions['counter'],
            records: this.metaData['records'] || 50,
            search: this.searchTerm,
            filters: availableFilterObj,
            metaData: this.getHeaderMetaData(),
          }
        };
        this.actionEmitter.emit(actionToEmit);
      }
    } catch (error) {
      console.error(error);
    }
  }

  implementColumnLevelSearch() {
    try {
      if (this.tableDataWithActions['server_search']) {
        const availableFilterObj = { ...this.filterObject };
        this.updateFilters(availableFilterObj, '');
        this.tableDataWithActions['counter'] = 1;
        this.actionEmitter.emit({
          action: {
            sortData: this.sortData,
            type: 'columnSearch',
            page: this.tableDataWithActions['counter'],
            records: this.metaData['records'] || 50,
            headers: this.tableDataWithActions['tableData']['headerContent'],
            filters: availableFilterObj,
            metaData: this.getHeaderMetaData(),
            action: 'columnSearch'
          }
        });
        if ((['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
          if (document.getElementById('serverSearchModal') && document.getElementById('serverSearchModal').classList.contains('show')) {
            document.getElementById('serverSearchButton').click();
          }
        }
        return;
      }
      let filteredData = this.tableDataWithActions['tableData']['bodyContent'];
      for (const eachHeader of this.tableDataWithActions['tableData']['headerContent']) {
        if (eachHeader.enable) {
          filteredData = this.transform(filteredData, this.filterObject[eachHeader['key'] || eachHeader['value']] || '', eachHeader['key'] || eachHeader['value'], eachHeader.header_type);
        }
      }
      this.filteredData = filteredData;
      if (this.tableDataWithActions['table_type'] === 'client_side') {
        this.seggregateTableData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  transform(items: any, filter: any, field: any, type: any) {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: any) => this.applyFilter(item, filter, field, type));
  }

  applyFilter(search: any, filter: any, field: any, type: any): boolean {
    let eachItemDate;
    switch (type) {
      case 'number' :
      case 'select':
        if (search[field] !== filter) {
          return false;
        }
        break;
      case 'text':
        return search[field].toLowerCase().indexOf(filter.toLowerCase()) > -1;
      case 'multiselect':
        return filter.indexOf(search[field]) > -1;
      case 'date_range':
        eachItemDate = new Date(search[field]);
        if (filter && filter.length === 2) {
          return eachItemDate >= filter[0] && eachItemDate <= filter[1];
        }
    }
    return true;
  }

  onRowClick(rowIndex: any, rowData?, event?) {
    if ((['xs', 'sm', 'md'].indexOf(this.mediaBreakPoint) > -1)) {
      event.stopPropagation();
    }
    this.tableDataWithActions.expandedRowIndex = this.tableDataWithActions.expandedRowIndex === rowIndex ? undefined : rowIndex;
    if (this.tableDataWithActions.lazyLoadExpData && this.tableDataWithActions.expandedRowIndex !== undefined) {
      this.actionEmitter.emit({ rowIndex, rowData, action: { type: 'rowExpand' } });
    }
  }
  onEachRowClick(rowIndex, eachItem) {
    try {
      if (this.tableDataWithActions['enableRowClick']) {
        this.emitAction({ type: 'row-click' }, eachItem, rowIndex);
      }
    } catch (error) {
      console.error(error);
    }
  }
  onChaneInColumnInput() {
    try {
      this.columnLevelFilters.next(null);
    } catch (error) {
      console.error(error);
    }
  }

  sortBodyContent(header: any) {
    try {
      if (!this.tableDataWithActions['enable_sort'] || (this.tableDataWithActions['enable_sort'] && header['hide_sort'])) {
        return;
      }
      const headerKey = header.key || header.value;
      if (headerKey === this.sortData.key) {
        this.sortData.asc = !this.sortData.asc;
      }
      const availableFilterObj = { ...this.filterObject };
      this.updateFilters(availableFilterObj, '');
      this.sortData = { key: headerKey || header.value, asc: this.sortData.asc };
      if (this.tableDataWithActions['server_search']) {
        this.actionEmitter.emit({
          action: {
            type: 'columnSort',
            action: 'columnSort',
            headers: this.tableDataWithActions['tableData']['headerContent'],
            sortData: this.sortData,
            page: this.tableDataWithActions['counter'],
            records: this.metaData['records'] || 50,
            filters: availableFilterObj,
          }
        });
        return;
      }
      if (header.dataType === 'number') {
        if (this.sortData.asc) {
          this.filteredData = this.filteredData.toSorted((a, b) => a[headerKey] - b[headerKey]);
        } else {
          this.filteredData = this.filteredData.toSorted((a, b) => b[headerKey] - a[headerKey]);
        }
      } else if (header.dataType === 'date') {
        if (this.sortData.asc) {
          this.filteredData = this.filteredData.toSorted((a, b) =>
            new Date(a[headerKey]).getTime() - new Date(b[headerKey]).getTime());
        } else {
          this.filteredData = this.filteredData.toSorted((a, b) =>
            new Date(b[headerKey]).getTime() - new Date(a[headerKey]).getTime());
        }
      } else  if (this.sortData.asc)  {
          this.filteredData = this.filteredData.toSorted((a, b) => (a[headerKey] || '').toLowerCase() < (b[headerKey] || '').toLowerCase() ? -1 : 1);
        } else {
          this.filteredData = this.filteredData.toSorted((a, b) => (a[headerKey] || '').toLowerCase() > (b[headerKey] || '').toLowerCase() ? -1 : 1);
      }
      this.filteredData = this.filteredData.slice();
      if (this.tableDataWithActions['table_type'] === 'client_side') {
        this.seggregateTableData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  updateFilters(filterObj, defaultValue?: any) {
    try {
      const headerContent = this.tableDataWithActions['tableData']['headerContent'];
      for (const item of headerContent) {
        filterObj[item['key'] || item['value']] = filterObj[item['key'] || item['value']] || defaultValue;
      }
      return filterObj;
    } catch (error) {
      console.error(error);
    }
  }
  getHeaderMetaData() {
    const metaObj = {};
    try {
      const headerContent = this.tableDataWithActions['tableData']['headerContent'];
      for (const item of headerContent) {
        metaObj[item['key'] || item['value']] = item['options'] || [];
      }
      return metaObj;
    } catch (error) {
      console.error(error);
      return metaObj;
    }
  }
  updateVirtualScrollHeight(updateScrollHeight?: any) {
    try {
      if (this.tableDataWithActions.enableRowExpand) {
        if (this.tableDataWithActions.expandedRowIndex !== undefined) {
          this.metaData['scroll_height'] = this.metaData['scroll_height'] + 140;
        } else if (updateScrollHeight) {
          this.metaData['scroll_height'] = this.metaData['scroll_height'] - 140;
        }
        this.metaData['scroll_height_px'] = this.metaData['scroll_height'] + 'px';
      }
    } catch (error) {
      console.error(error);
    }
  }
  onDateRangeFilterClear(event, filterContent, defValue) {
    try {
      if (event) {
        event.preventDefault();
      }
      this.filterObject[filterContent['key'] || filterContent['value']] = defValue;
      this.onChaneInColumnInput();
    } catch (error) {
      console.error(error);
    }
  }
  onChangeInColumnFilter() {
    try {
      const availableHeaderContent = [...this.tableDataWithActions['tableData']['headerContent']];
      const selectedHeaders = [...this.displayColumns];
      for (const eachHeader of selectedHeaders) {
        const headerKey = eachHeader.hasOwnProperty('key') ? 'key' : 'value';
        const headerInd = availableHeaderContent.findIndex(eachItem => (eachItem[headerKey] === eachHeader[headerKey]));
        eachHeader['headerInd'] = headerInd;
      }
      selectedHeaders.sort((a, b) => {
        return a['headerInd'] - b['headerInd'];
      });
      this.displayColumns = [...selectedHeaders];
    } catch (error) {
      console.error(error);
    }
  }
  checkIfScrollExists() {
    try {
      let scrollWidth = 0;
      const simpleTableDIv = document.getElementById('ScrollableSimpleTableBody');
      if (simpleTableDIv) {
        const vs = simpleTableDIv.scrollHeight > simpleTableDIv.clientHeight;
        if (vs) {
          scrollWidth = 9;
        }
      }
      const simpleTableHeader = document.getElementById('simple_table_header');
      if (simpleTableHeader) {
        simpleTableHeader.setAttribute('style', 'width: calc(100% - ' + scrollWidth + 'px)');
      }
    } catch (error) {
      console.error(error);
    }
  }
  ngOnDestroy() {
    if (this.searchInputChanges) {
      this.searchInputChanges.unsubscribe();
    }
    if (this.columnLevelFilters) {
      this.columnLevelFilters.unsubscribe();
    }
    if (this.changeInTableData) {
      this.changeInTableData.unsubscribe();
    }
    if (this.mediaResolutionSubscription) {
      this.mediaResolutionSubscription.unsubscribe();
    }
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
  updateSeggregationTableOptions(bodyContentLength) {
    try {
      this.metaData['display_options'] = [];
      for (const eachOption of this.defaultDisplayOptions) {
        if (eachOption['value'] < bodyContentLength) {
          this.metaData['display_options'].push(eachOption);
        } else {
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  ngSelectSeletionType(type) {
    for (const header of this.tableDataWithActions.tableData.headerContent) {
      if (!header.disabled) {
        header.optional_header = type !== 'select_all';
      }
    }
    this.updateTableData();
  }

  mouseover(event, data = {}) {
    if (event.ctrlKey) {
      this.tooltipContent = JSON.stringify(data);
    }
  }

  mouseout() {
    this.tooltipContent = null;
  }

  // PWA Application
  mobileViewHeader() {
    try {
      if (this.tableDataWithActions['tableData']?.['headerContent']?.length) {
        for (const eachHeader of this.tableDataWithActions['tableData']['headerContent']) {
          if (this.mobileDisplayColumns.length < 3) {
            if (eachHeader.hasOwnProperty('header_type')) {
              if (eachHeader['header_type'] === 'text' || eachHeader['header_type'] === 'select') {
                this.mobileDisplayColumns.push(eachHeader);
              } else if (eachHeader['header_type'] === 'image') {
                this.mobileDisplayColumns.unshift(eachHeader);
              }
            } else if (eachHeader.hasOwnProperty('type')) {
              if (eachHeader['type'] === 'text' || eachHeader['key'] === 'username') {
                this.mobileDisplayColumns.push(eachHeader);
              } else if (eachHeader['type'] === 'image') {
                this.mobileDisplayColumns.unshift(eachHeader);
              }
            } else if (!eachHeader.hasOwnProperty('header_type') || !eachHeader.hasOwnProperty('type')) {
              this.mobileDisplayColumns.push(eachHeader);
            }
          } else {
            break;
          }
        }
      }
    } catch (headerFormError) {
      console.error(headerFormError);
    }
  }
  containsImage() {
    try {
      if (this.mobileDisplayColumns?.length) {
        if (this.mobileDisplayColumns[0]['header_type'] === 'image' || this.mobileDisplayColumns[0]['type'] === 'image') {
          return true;
        }
        return false;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  openServerSearch() {
    try {
      document.getElementById('serverSearchButton').click();
    } catch (err) {
      console.error(err);
    }
  }
  handleRefreshEvent(refresh_action) {
    try {
      if (refresh_action) {
        const availableFilterObj = { ...this.filterObject };
        this.updateFilters(availableFilterObj, '');
        refresh_action['filters'] = availableFilterObj;
        this.emitAction(refresh_action);
      }
    } catch (refreshHandlerErr) {
      console.error(refreshHandlerErr);
    }
  }
}