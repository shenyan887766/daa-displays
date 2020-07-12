export const playbackTemplate: string = `
<div id="{{id}}" class="simulation-controls" style="position:absolute;">
    <div class="input-group input-group-sm mb-3" style="width:{{width}}px;left:{{left}}px;top:{{top}}px;">
        <div class="container-fluid" style="padding:0px;">
            <div class="row">
                <div class="col-sm">

                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="btn-sm sim-control" style="text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Simulation Speed</span>
                        </div>
                        <input id="{{id}}-speed-input" style="text-align:center;" type="number" value="10" min="1" max="1000" step="1" aria-label="simulation speed" class="form-control">
                    </div>
                </div>
                <div class="col-sm">

                    <div class="input-group input-group-sm mb-3" style="display:none; margin-right:30px;">
                        <span class="btn-sm sim-control" style="text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap; vertical-align: middle; width:100%;">
                            Simulation step: 
                            <span id="{{id}}-curr-sim-step" style="margin-left:4px; margin-right:4px;">0</span>
                            of
                            <span id="{{id}}-tot-sim-steps" style="margin-left:4px; margin-right:4px;">0</span>
                        </span>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="btn-sm" style="text-align:left; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle; min-width:200px; width:100%;">
                            Current Time: 
                            <span style="float:right; text-align:right;">
                                <span id="{{id}}-curr-sim-time" style="margin-left:4px; margin-right:4px;">0</span><span>sec</span>
                            </span>
                        </span>
                    </div>

                </div>
                <div class="col-sm">
    
                    <div class="input-group mb-3">
                        <div class="btn-group btn-group-toggle" role="group" aria-label="View">
                            <button type="button" class="btn btn-sm btn-warning sim-control" id="{{id}}-back" style="width:86px;" alt="Step backward"><i class="fa fa-step-backward"></i></button>
                            <button type="button" class="btn btn-sm btn-danger sim-control" id="{{id}}-pause" style="width:86px;">Stop</button>
                            <button type="button" class="btn btn-sm btn-primary sim-control" id="{{id}}-play" style="width:90px;">Play</button>
                            <button type="button" class="btn btn-sm btn-warning sim-control" id="{{id}}-step" style="width:86px;" alt="Step forward"><i class="fa fa-step-forward"></i></button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                </div>
                <div class="col-sm">
                    <div class="input-group input-group-sm mb-3" style="display:none;">
                        <button id="{{id}}-goto" type="button" class="btn btn-sm btn-secondary sim-control" style="width:84px;">GoTo</button>
                        <input id="{{id}}-goto-input" style="text-align:center;" type="number" value="0" min="0" aria-label="goto" class="form-control">
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <button id="{{id}}-goto-time" type="button" class="btn btn-sm btn-secondary sim-control">Go to Time</button>
                        <input id="{{id}}-goto-time-input" style="text-align:center;" type="text" value="0" aria-label="goto-time" class="form-control">
                    </div>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
    </div>
</div>`;

export const activationPanel: string =`
<div id="{{id}}-activation-panel" class="activation-panel" style="position:absolute;width:100%;">
    <div class="input-group mb-3" style="width:{{width}}px; margin-right:30px;">
        <div class="btn-group btn-group-toggle" role="group" aria-label="View">
            <button type="button" class="btn btn-sm btn-success load-scenario-btn" style="white-space:nowrap; width:{{width}}px;">Load Selected Scenario and Configuration</button>
        </div>
    </div>
</div>`;

export const daidalusParametersTemplate: string = `
<select id="{{id}}-list" class="form-control" size="16" style="overflow:auto;">
    {{#each daidalus.parameters}}
    <option id="{{../id}}-{{@key}}">{{@key}}: {{this}}</option>
    {{/each}}
</select>`;

export const daidalusVersionsTemplate: string = `
<select id="{{id}}-list" class="form-control sim-selector" size="1">
    {{#each versions}}
    <option {{#if @first}}selected {{/if}}id="{{../id}}-{{this}}">{{this}}</option>
    {{/each}}
</select>`;

export const windSettingsTemplate: string = `
<select id="{{id}}-list-degs" class="form-control sim-selector {{id}}-list" size="1">
    {{#each degs}}
    <option {{#if @first}}selected {{/if}}id="{{../id}}-{{this}}" value="{{this}}">{{this}} deg</option>
    {{/each}}
</select>
<select id="{{id}}-list-knots" class="form-control sim-selector {{id}}-list" size="1">
    {{#each knots}}
    <option {{#if @first}}selected {{/if}}id="{{../id}}-{{this}}" value="{{this}}">{{this}} knot</option>
    {{/each}}
</select>`;

export const windSettingsInputGroupTemplate: string = `
<div class="input-group input-group-sm">
    <div class="input-group-prepend">
        <span class="input-group-text" id="{{id}}-deg-label">deg&nbsp;</span>
    </div>
    <input type="number" id="{{id}}-list-degs" style="font-size:1em !important;" class="form-control {{id}}-list" aria-label="direction" aria-describedby="{{id}}-deg-label">
    <div class="input-group-append">
        <select id="{{id}}-from-to-selector" style="display:none;" class="form-control sim-selector {{id}}-list" size="1">
            <option selected value="from">from</option>
            <option value="to">to</option>
        </select>
    </div>
</div>
<div class="input-group input-group-sm">
    <div class="input-group-prepend">
        <span class="input-group-text" id="{{id}}-knot-label">knot</span>
    </div>
    <input type="number" id="{{id}}-list-knots" class="form-control {{id}}-list" aria-label="magnitude" aria-describedby="{{id}}-knot-label">
</div>`;

export const daaScenariosTemplate: string = `
<select id={{id}}-scenarios-list class="form-control" size="20" style="overflow:auto;">
    {{#each scenarios}}
    <option {{#if this.selected}}selected {{/if}}id="{{../id}}-scenario-{{this.id}}">{{this.name}}</option>
    {{/each}}
</select>`;

export const daidalusConfigurationsTemplate: string = `
<select id="{{id}}-list" class="form-control sim-selector" size="1">
    {{#each configurations}}
    <option id="{{../id}}-{{this}}">{{this}}</option>
    {{/each}}
</select>`;

export const daidalusAttributesTemplate: string = `
<select id={{id}}-attributes-list class="form-control" size="30" style="overflow:auto;margin-bottom:20px;">
    <option id="{{id}}-{{fileName}}">## Configuration {{fileName}}</option>
    {{#each attributes}}
    <option id="{{id}}-{{this}}">{{this}}</option>
    {{/each}}
</select>`;

export const sidePanelTemplate: string = `
<div class="container-fluid">
<div class="row">
    <nav id="sidebar-panel" class="col-md-2 d-none d-md-block bg-light sidebar">
        <div id="sidebar-resize" style="float:right; width: 6px; cursor: col-resize; height: 100%; background-color: #272b2f;"></div>
        <div class="sidebar-sticky">
            <h6 class="zoomable-sidebar sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span><b>Scenarios</b></span> 
                <button id="{{id}}-refresh-scenarios" class="btn btn-secondary btn-sm" type="button" style="display:none">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
            </h6>
            <ul class="zoomable-sidebar nav flex-column mb-2" style="width:90%; margin-left:16px; margin-right:18px;">
                <li class="nav-item" id="{{id}}-scenarios">
                </li>
            </ul>

            <div id="single-view">
                <h6 class="zoomable-sidebar sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span class="sidebar-wind-optionals" style="display:none;"><b>Wind Settings</b></span>
                </h6>
                <ul class="sidebar-wind-optionals zoomable-sidebar nav flex-column mb-2" style="display:none; width:90%; margin-left:16px; margin-right:18px;">
                    <li class="nav-item" id="sidebar-wind-settings">
                    </li>
                </ul>

                <h6 class="zoomable-sidebar sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span style="display:none;" class="sidebar-version-optionals"><b>Daidalus Version</b></span>
                    <button id="{{id}}-refresh-daidalus-versions" class="btn btn-secondary btn-sm" type="button" style="display:none">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </h6>
                <ul class="zoomable-sidebar sidebar-version-optionals nav flex-column mb-2" style="width:90%; display:none; margin-left:16px; margin-right:18px;">
                    <li class="nav-item" id="sidebar-daidalus-version">
                    </li>
                </ul>

                <h6 class="zoomable-sidebar sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span style="display:none;" class="sidebar-config-optionals"><b>Daidalus Configuration</b></span>
                    <button id="{{id}}-refresh-daidalus-configurations" class="btn btn-secondary btn-sm" type="button" style="display:none">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </h6>
                <ul class="zoomable-sidebar sidebar-config-optionals nav flex-column mb-2" style="width:90%; display:none; margin-left:16px; margin-right:18px;">
                    <li class="nav-item" id="sidebar-daidalus-configuration">
                    </li>
                </ul>

                <h6 class="zoomable-sidebar sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span style="display:none;" class="sidebar-config-optionals"><b>Daidalus Parameters</b></span>
                </h6>
                <ul class="zoomable-sidebar sidebar-config-optionals nav flex-column mb-2" style="width:90%; display:none; margin-left:16px; margin-right:18px;">
                    <li class="nav-item" id="sidebar-daidalus-configuration-attributes">
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
</div>`;

export const loadingTemplate: string = `
<div id="{{id}}" class="daa-loading" style="position:absolute; width:0px; height:0px;">
    <div class="sk-cube-grid" style="width:{{width}}px; height:{{height}}px; margin-left:{{left}}px; margin-right:{{right}}px;">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>
</div>`;

export const navbarTemplate: string = `
<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <span class="navbar-brand col-sm-3 col-md-2 mr-0">DAA-Displays {{version}}</span>
    {{#if zoomables}}
    <span style="position:absolute; left:20%;">
        <div class="input-group input-group-sm mb-3" style="margin:0px !important;">
            <div class="input-group-prepend">
                <span class="btn-sm" style="text-align:center; color:white; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Window Zoom Level</span>
            </div>
            <button type="button" class="btn btn-sm btn-warning" id="{{id}}-zoom-minus"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-sm btn-primary" id="{{id}}-zoom-plus"><i class="fa fa-plus"></i></button>
        </div>
    </span>
    {{/if}}
    <span id="{{id}}-status" class="animated infinite pulse navbar-text col-sm-3 col-md-2 mr-0" style="color:white; display:none; position:absolute; left:950px; text-align:center;"></span>
</nav>`;

export const spectrogramControls: string = `
<div id="{{id}}-spectrogram-controls-inner" style="position:absolute;width:100%;">
    <div class="input-group input-group-sm mb-3" style="width:{{width}}px;left:{{left}}px;top:{{top}}px;">
        <div class="container-fluid" style="padding:0px;">
            <div class="row">
                <div class="col-sm">
                    <div class="btn-group btn-group-toggle" role="group" aria-label="Plot Controls">
                        <button type="button" class="btn btn-sm btn-warning sim-control" id="{{id}}-reset" style="width:136px; white-space:nowrap;">Reset</button>
                        <button type="button" class="btn btn-sm btn-primary sim-control" id="{{id}}-plot" style="width:212px; white-space:nowrap;">Plot</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

export const developersControls: string = `
<div class="input-group input-group-sm mb-3" style="top:{{top}}px; left:{{left}}px; display:{{display}};">
  <div id="{{id}}-developer-mode-button" class="input-group-prepend">
    <div class="input-group-text" style="width:{{width}}px;">
      <input id="{{id}}-developer-mode-checkbox" type="checkbox" aria-label="Enable developer mode">
      <span style="margin-left: 4px;">Developer mode</span>
    </div>
  </div>
</div>`;

export const resolutionControls: string = `
<div id="{{id}}" class="resolution-controls" style="position:absolute;">
    <div class="input-group input-group-sm mb-3" style="width:{{width}}px;left:{{left}}px;top:{{top}}px;">
        <div class="container-fluid" style="padding:0px;">
            <div class="row">
                <div class="col-sm">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="btn-sm max-compass-wedge-aperture" style="width:240px; text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Max Heading Wedge</span>
                        </div>
                        <input id="{{id}}-max-compass-wedge-aperture-input" style="text-align:center;" type="number" value="15" min="0" max="360" step="1" aria-label="heading wedge aperture" class="form-control">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="btn-sm max-airspeed-wedge-aperture" style="width:240px; text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Max Horizontal Speed Notch</span>
                        </div>
                        <input id="{{id}}-max-airspeed-wedge-aperture-input" style="text-align:center;" type="number" value="50" min="0" step="1" aria-label="horizontal speed notch aperture" class="form-control">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="btn-sm max-vspeed-wedge-aperture" style="width:240px; text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Max Vertical Speed Notch</span>
                        </div>
                        <input id="{{id}}-max-vspeed-wedge-aperture-input" style="text-align:center;" type="number" value="500" min="0" step="1" aria-label="vertical speed notch aperture" class="form-control">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <div class="input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="btn-sm max-altitude-wedge-aperture" style="width:240px; text-align:center; background-color:#e9ecef; border:1px solid #ced4da; white-space:nowrap;vertical-align: middle;">Max Altitude Notch</span>
                        </div>
                        <input id="{{id}}-max-altitude-wedge-aperture-input" style="text-align:center;" type="number" value="300" min="0" step="1" aria-label="altitude notch aperture" class="form-control">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;