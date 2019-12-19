/**
 * @module GeoFence
 * @version 2019.12.17
 * @description <div style="display:flex;"><div style="width:50%;">
 *              <b>Geofences.</b>
 *              <p>This widget renders geofences over a geographic map.</p>
 *              </div>
 *              </div>
 * 
 * @author Paolo Masci
 * @date December 2018
 * @copyright
 * Copyright 2016 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration. No
 * copyright is claimed in the United States under Title 17,
 * U.S. Code. All Other Rights Reserved.
 * <br>
 * Disclaimers
 * <br>
 * No Warranty: THE SUBJECT SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY
 * WARRANTY OF ANY KIND, EITHER EXPRESSED, IMPLIED, OR STATUTORY,
 * INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY THAT THE SUBJECT SOFTWARE
 * WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR FREEDOM FROM
 * INFRINGEMENT, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL BE ERROR
 * FREE, OR ANY WARRANTY THAT DOCUMENTATION, IF PROVIDED, WILL CONFORM TO
 * THE SUBJECT SOFTWARE. THIS AGREEMENT DOES NOT, IN ANY MANNER,
 * CONSTITUTE AN ENDORSEMENT BY GOVERNMENT AGENCY OR ANY PRIOR RECIPIENT
 * OF ANY RESULTS, RESULTING DESIGNS, HARDWARE, SOFTWARE PRODUCTS OR ANY
 * OTHER APPLICATIONS RESULTING FROM USE OF THE SUBJECT SOFTWARE.
 * FURTHER, GOVERNMENT AGENCY DISCLAIMS ALL WARRANTIES AND LIABILITIES
 * REGARDING THIRD-PARTY SOFTWARE, IF PRESENT IN THE ORIGINAL SOFTWARE,
 * AND DISTRIBUTES IT "AS IS."
 * <br>
 * Waiver and Indemnity: RECIPIENT AGREES TO WAIVE ANY AND ALL CLAIMS
 * AGAINST THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND
 * SUBCONTRACTORS, AS WELL AS ANY PRIOR RECIPIENT.  IF RECIPIENT'S USE OF
 * THE SUBJECT SOFTWARE RESULTS IN ANY LIABILITIES, DEMANDS, DAMAGES,
 * EXPENSES OR LOSSES ARISING FROM SUCH USE, INCLUDING ANY DAMAGES FROM
 * PRODUCTS BASED ON, OR RESULTING FROM, RECIPIENT'S USE OF THE SUBJECT
 * SOFTWARE, RECIPIENT SHALL INDEMNIFY AND HOLD HARMLESS THE UNITED
 * STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS ANY
 * PRIOR RECIPIENT, TO THE EXTENT PERMITTED BY LAW.  RECIPIENT'S SOLE
 * REMEDY FOR ANY SUCH MATTER SHALL BE THE IMMEDIATE, UNILATERAL
 * TERMINATION OF THIS AGREEMENT.
 **/
import * as WorldWind from '../wwd/worldwind.min';
import * as utils from '../daa-utils';
import * as serverInterface from '../utils/daa-server'

export class GeoFence {
    protected renderablePolygons: { [ key: string ] : { area: WorldWind.SurfacePolygon, perimeter: WorldWind.SurfacePolygon, label: WorldWind.GeographicText } } = {};
    protected layer: WorldWind.RenderableLayer;
    static readonly maxLabelFontSize: number = 32;

    /**
     * Constructor
     * @param layer WWD layer for rendering geofences  
     */
    constructor (layer: WorldWind.RenderableLayer) {
        if (layer) {
            this.layer = layer;
        }
    }
    setScale (NMI: number): GeoFence {
        const keys: string[] = Object.keys(this.renderablePolygons);
        for (let i = 0; i < keys.length; i++) {
            this.renderablePolygons[keys[i]].label.attributes.font.size = 80 / NMI;
        }
        return this;
    }
    protected createLabel (verticalBoundaries: { top: number | string, bottom: number | string }): string {
        const nCharacters: number = Math.max(`${verticalBoundaries.top}`.length, `${verticalBoundaries.bottom}`.length);
        const vline: string = '─'.repeat(nCharacters);
        const label: string = 
`${verticalBoundaries.top}
 ${vline}
 ${verticalBoundaries.bottom}`;
        return label;
    }
    /**
     * Adds a geofence polygon
     * @param id Unique identifier of the geofence
     * @param perimeter Perimeter of the geofence
     * @param opt Geofence options (color)
     */
    addPolygon2D (id: string, perimeter: utils.LatLon[] | serverInterface.LatLon[], floor: { top: number | string, bottom: number | string }, opt?: { color?: { r: number, g: number, b: number } }): GeoFence {
        if (this.layer) {
            if (perimeter && perimeter.length > 0) {
                opt = opt || {};
                opt.color = opt.color || { r: 1, g: 0, b: 0 }; // default color is red, as in Temporary Flight Restriction (TFR) areas
    
                // create perimeter
                const outer: WorldWind.Position[] = [];
                const mid: { lat: number, lon: number } = { lat: 0, lon: 0 };
                for (let i = 0; i < perimeter.length; i++) {
                    outer.push(new WorldWind.Position(+perimeter[i].lat, +perimeter[i].lon, 0));
                    mid.lat += +perimeter[i].lat;
                    mid.lon += +perimeter[i].lon;
                }
                mid.lat /= perimeter.length;
                mid.lon /= perimeter.length;
                const label_position: WorldWind.Position = new WorldWind.Position(mid.lat, mid.lon, 0);
                
                // define area attributes
                const area_attributes = new WorldWind.ShapeAttributes(null);
                area_attributes.drawInterior = true;
                area_attributes.drawOutline = false;
                area_attributes.interiorColor = new WorldWind.Color(opt.color.r, opt.color.g, opt.color.b, 0.2);
                area_attributes.drawVerticals = false;
                area_attributes.applyLighting = false;
                area_attributes.depthTest = false; // this prevents the area from being occluded by other objects in the scene

                // define perimeter attributes
                const perimeter_attributes = new WorldWind.ShapeAttributes(null);
                perimeter_attributes.drawInterior = false;
                perimeter_attributes.drawOutline = true;
                perimeter_attributes.outlineWidth = 2;
                perimeter_attributes.outlineColor = new WorldWind.Color(opt.color.r, opt.color.g, opt.color.b, 0.8);
                perimeter_attributes.drawVerticals = false;
                perimeter_attributes.applyLighting = false;
                perimeter_attributes.depthTest = false; // this prevents the area from being occluded by other objects in the scene

                // define label attributes
                const label_attributes: WorldWind.TextAttributes = new WorldWind.TextAttributes(null);
                label_attributes.color = perimeter_attributes.outlineColor;
                label_attributes.font.weight = "bold";
                label_attributes.font.size = GeoFence.maxLabelFontSize; // font size needs to be dynamically adjusted based on the zoom level of the map. This is done using function setScale, which is invoked by Airspace.setZoomLevel(NMI) and from Airspace.autoscale()
                // label_attributes.offset = new WorldWind.Offset(WorldWind.OFFSET_PIXELS, aircraftLabel.offsetX, WorldWind.OFFSET_PIXELS, aircraftLabel.offsetY);
                label_attributes.depthTest = false;

    
                // create renderables
                const area: WorldWind.SurfacePolygon = new WorldWind.SurfacePolygon(outer, area_attributes);
                const per: WorldWind.SurfacePolygon = new WorldWind.SurfacePolygon(outer, perimeter_attributes);
                const label: WorldWind.GeographicText = new WorldWind.GeographicText(label_position, this.createLabel(floor));
                label.attributes = label_attributes;

                this.renderablePolygons[id] = { area, perimeter: per, label };
                this.layer.addRenderable(this.renderablePolygons[id].area);
                this.layer.addRenderable(this.renderablePolygons[id].perimeter);
                this.layer.addRenderable(this.renderablePolygons[id].label);
            }
        } else {
            console.error("[geofence] Warning: Could not add polygon (renderable layer is null).");
        } 
        return this;
    }
    /**
     * Removes a specific geofence
     * @param id Identifier of the geofence to be removed
     */
    removePolygon (id: string): GeoFence {
        if (this.layer) {
            if (id) {
                this.layer.removeRenderable(this.renderablePolygons[id].area);
                this.layer.removeRenderable(this.renderablePolygons[id].perimeter);
                this.layer.removeRenderable(this.renderablePolygons[id].label);
            } else {
                console.error(`[geofence] Warning: Could not remove polygon (polygon id was not provided)`);
            }
        }
        return this;
    }
    /**
     * Shows all geofences
     */
    reveal (): GeoFence {
        if (this.layer) {
            this.layer.enabled = true;
        }
        return this;
    }
    /**
     * Hides all geofences
     */
    hide (): GeoFence {
        if (this.layer) {
            this.layer.enabled = false;
        }
        return this;
    }
    /**
     * Removes all geofences
     */
    remove (): GeoFence {
        if (this.layer) {
            const keys: string[] = Object.keys(this.renderablePolygons);
            for (let i = 0; i < keys.length; i++) {
                this.removePolygon(keys[i]);
            }
        }
        return this;
    }
}