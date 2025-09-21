import { NgModule } from '@angular/core';
import { CommonModule, PlatformLocation, Location } from '@angular/common';
import { MonacoEditorModule, NgxMonacoEditorConfig, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

import { CommomCalcBuilderComponent } from './commom-calc-builder/commom-calc-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommomCalcBuilderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
  ],
  exports: [
    CommomCalcBuilderComponent
  ],
  providers: [
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useFactory: getMonacoConfig,
      deps: [PlatformLocation],
    }
  ],
})
export class MonacoEditorKitModule { }


export function getMonacoConfig(platformLocation: PlatformLocation): NgxMonacoEditorConfig {
  console.log('here');
  const baseHref = platformLocation.getBaseHrefFromDOM();
  return {
    baseUrl: Location.joinWithSlash(baseHref, '/assets'),
    onMonacoLoad: () => { 
      (window as any).monaco.languages.register({ id: 'newlang' });
     },
  };
}

