declare global {
  // 该类型由deepseek生成，可能有错误或缺失
  namespace BMap {
    /* 基础数据类型 */
    class Point {
      constructor(lng: number, lat: number)
      lng: number
      lat: number
      equals(other: Point): boolean
    }

    class Pixel {
      constructor(x: number, y: number)
      x: number
      y: number
      equals(other: Pixel): boolean
    }

    class Size {
      constructor(width: number, height: number)
      width: number
      height: number
      equals(other: Size): boolean
    }

    class Bounds {
      constructor(sw: Point, ne: Point)
      containsPoint(point: Point): boolean
      containsBounds(bounds: Bounds): boolean
      intersects(other: Bounds): boolean
      extend(point: Point): void
      getCenter(): Point
      getSouthWest(): Point
      getNorthEast(): Point
      isEmpty(): boolean
    }

    /* 地图核心类 */
    class Map {
      constructor(container: string | HTMLElement, opts?: MapOptions)

      // 地图状态方法
      centerAndZoom(center: Point | string, zoom: number): void
      setCenter(center: Point | string): void
      getCenter(): Point
      setZoom(zoom: number): void
      getZoom(): number
      getBounds(): Bounds
      getSize(): Size
      getMapType(): MapType
      setMapType(mapType: MapType): void
      setViewport(view: Point[] | Viewport, viewportOptions?: ViewportOptions): void

      // 交互控制方法
      enableDragging(): void
      disableDragging(): void
      enableScrollWheelZoom(): void
      disableScrollWheelZoom(): void
      enableDoubleClickZoom(): void
      disableDoubleClickZoom(): void
      enableKeyboard(): void
      disableKeyboard(): void
      enableInertialDragging(): void
      disableInertialDragging(): void
      enableContinuousZoom(): void
      disableContinuousZoom(): void
      enablePinchToZoom(): void
      disablePinchToZoom(): void

      // 覆盖物管理
      addOverlay(overlay: Overlay): void
      removeOverlay(overlay: Overlay): void
      clearOverlays(): void
      getOverlays(): Overlay[]

      // 控件管理
      addControl(control: Control): void
      removeControl(control: Control): void

      // 坐标转换
      pointToOverlayPixel(point: Point): Pixel
      overlayPixelToPoint(pixel: Pixel): Point
      pointToPixel(point: Point): Pixel
      pixelToPoint(pixel: Pixel): Point

      // 信息窗口
      openInfoWindow(infoWnd: InfoWindow, point: Point): void
      closeInfoWindow(): void

      // 事件
      addEventListener(event: string, handler: (e: any) => void): void
      removeEventListener(event: string, handler: (e: any) => void): void
    }

    interface MapOptions {
      minZoom?: number
      maxZoom?: number
      enableHighResolution?: boolean
      enableAutoResize?: boolean
      enableMapClick?: boolean
      disableDoubleClickZoom?: boolean
      enableTrackResize?: boolean
    }

    /* 地图类型 */
    class MapType {
      constructor(name: string, layers: TileLayer[], options?: MapTypeOptions)
      getName(): string
      getTileLayer(): TileLayer
      getMinZoom(): number
      getMaxZoom(): number
      getProjection(): Projection
      getTextColor(): string
      getTips(): string
    }

    interface MapTypeOptions {
      minZoom?: number
      maxZoom?: number
      errorImageUrl?: string
      textColor?: number
      tips?: string
    }

    /* 覆盖物基类 */
    class Overlay {
      initialize(map: Map): HTMLElement
      draw(): void
      show(): void
      hide(): void
      isVisible(): boolean
      getMap(): Map
      setTop(isTop: boolean): void
    }

    /* 标记 */
    class Marker extends Overlay {
      constructor(point: Point, options?: MarkerOptions)
      setPosition(position: Point): void
      getPosition(): Point
      setIcon(icon: Icon): void
      getIcon(): Icon
      setLabel(label: Label): void
      getLabel(): Label
      setTitle(title: string): void
      getTitle(): string
      enableDragging(): void
      disableDragging(): void
      setZIndex(zIndex: number): void
      setAnimation(animation: Animation): void
      getAnimation(): Animation | null
    }

    interface MarkerOptions {
      offset?: Size
      icon?: Icon
      enableMassClear?: boolean
      enableDragging?: boolean
      enableClicking?: boolean
      raiseOnDrag?: boolean
      draggingCursor?: string
      rotation?: number
      shadow?: Icon
      title?: string
    }

    /* 信息窗口 */
    class InfoWindow {
      constructor(content: string | HTMLElement, opts?: InfoWindowOptions)
      setWidth(width: number): void
      setHeight(height: number): void
      setTitle(title: string | HTMLElement): void
      setContent(content: string | HTMLElement): void
      getContent(): string | HTMLElement
      getPosition(): Point
      enableMaximize(): void
      disableMaximize(): void
      enableAutoPan(): void
      disableAutoPan(): void
      redraw(): void
    }

    interface InfoWindowOptions {
      width?: number
      height?: number
      maxWidth?: number
      offset?: Size
      title?: string
      enableAutoPan?: boolean
      enableCloseOnClick?: boolean
      enableMessage?: boolean
    }

    /* 矢量图形 */
    class Polyline extends Overlay {
      constructor(points: Point[], options?: PolylineOptions)
      setPath(path: Point[]): void
      getPath(): Point[]
      setStrokeColor(color: string): void
      getStrokeColor(): string
      setStrokeWeight(weight: number): void
      getStrokeWeight(): number
      setStrokeOpacity(opacity: number): void
      getStrokeOpacity(): number
      setStrokeStyle(style: string): void
      getStrokeStyle(): string
      enableEditing(): void
      disableEditing(): void
    }

    interface PolylineOptions {
      strokeColor?: string
      strokeWeight?: number
      strokeOpacity?: number
      strokeStyle?: string
      enableMassClear?: boolean
      enableEditing?: boolean
      enableClicking?: boolean
    }

    class Polygon extends Polyline {
      constructor(points: Point[], options?: PolygonOptions)
      setFillColor(color: string): void
      getFillColor(): string
      setFillOpacity(opacity: number): void
      getFillOpacity(): number
    }

    interface PolygonOptions extends PolylineOptions {
      fillColor?: string
      fillOpacity?: number
    }

    class Circle extends Overlay {
      constructor(center: Point, radius: number, options?: CircleOptions)
      setCenter(center: Point): void
      getCenter(): Point
      setRadius(radius: number): void
      getRadius(): number
      setStrokeColor(color: string): void
      getStrokeColor(): string
      setStrokeWeight(weight: number): void
      getStrokeWeight(): number
      setStrokeOpacity(opacity: number): void
      getStrokeOpacity(): number
      setStrokeStyle(style: string): void
      getStrokeStyle(): string
      setFillColor(color: string): void
      getFillColor(): string
      setFillOpacity(opacity: number): void
      getFillOpacity(): number
      enableEditing(): void
      disableEditing(): void
    }

    interface CircleOptions {
      strokeColor?: string
      strokeWeight?: number
      strokeOpacity?: number
      strokeStyle?: string
      fillColor?: string
      fillOpacity?: number
      enableMassClear?: boolean
      enableEditing?: boolean
      enableClicking?: boolean
    }

    /* 控件 */
    class Control {
      defaultAnchor?: ControlAnchor
      defaultOffset?: Size
      initialize?(map: Map): HTMLElement
      setAnchor(anchor: ControlAnchor): void
      getAnchor(): ControlAnchor
      setOffset(offset: Size): void
      getOffset(): Size
      show(): void
      hide(): void
      isVisible(): boolean
    }

    type ControlAnchor =
      | "BMAP_ANCHOR_TOP_LEFT"
      | "BMAP_ANCHOR_TOP_RIGHT"
      | "BMAP_ANCHOR_BOTTOM_LEFT"
      | "BMAP_ANCHOR_BOTTOM_RIGHT"

    // 导航控件
    class NavigationControl extends Control {
      constructor(opts?: NavigationControlOptions)
      setType(type: NavigationControlType): void
      getType(): NavigationControlType
    }

    interface NavigationControlOptions {
      type?: NavigationControlType
      anchor?: ControlAnchor
      offset?: Size
      showZoomInfo?: boolean
      enableGeolocation?: boolean
    }

    type NavigationControlType =
      | "BMAP_NAVIGATION_CONTROL_LARGE"
      | "BMAP_NAVIGATION_CONTROL_SMALL"
      | "BMAP_NAVIGATION_CONTROL_PAN"
      | "BMAP_NAVIGATION_CONTROL_ZOOM"

    // 缩略图控件
    class OverviewMapControl extends Control {
      constructor(opts?: OverviewMapControlOptions)
      changeView(): void
      setSize(size: Size): void
      getSize(): Size
    }

    interface OverviewMapControlOptions {
      anchor?: ControlAnchor
      offset?: Size
      size?: Size
      isOpen?: boolean
    }

    // 比例尺控件
    class ScaleControl extends Control {
      constructor(opts?: ScaleControlOptions)
      getUnit(): LengthUnit
      setUnit(unit: LengthUnit): void
    }

    interface ScaleControlOptions {
      anchor?: ControlAnchor
      offset?: Size
    }

    type LengthUnit = "BMAP_UNIT_METRIC" | "BMAP_UNIT_IMPERIAL"

    // 版权控件
    class CopyrightControl extends Control {
      constructor(opts?: CopyrightControlOptions)
      addCopyright(copyright: Copyright): void
      removeCopyright(copyrightId: number): void
      getCopyrightCollection(): Copyright[]
    }

    interface CopyrightControlOptions {
      anchor?: ControlAnchor
      offset?: Size
    }

    interface Copyright {
      id: number
      content?: string
      bounds?: Bounds
    }

    /* 服务类 */
    class Geocoder {
      constructor()
      getPoint(address: string, callback: (point: Point) => void, city: string): void
      getLocation(point: Point, callback: (result: ReverseGeocodeResult) => void, options?: ReverseGeocodeOptions): void
    }

    interface ReverseGeocodeResult {
      point: Point
      address: string
      addressComponents: AddressComponent
      surroundingPoi: LocalResultPoi[]
      business: string
    }

    interface AddressComponent {
      city: string
      district: string
      province: string
      street: string
      streetNumber: string
    }

    interface ReverseGeocodeOptions {
      poiRadius?: number
      numPois?: number
    }

    /* 其他服务类 */
    class LocalSearch {
      constructor(map: Map | HTMLElement | string, opts?: LocalSearchOptions)
      search(keyword: string | LocalSearchPoi[]): void
      searchNearby(keyword: string, center: Point, radius: number): void
      searchInBounds(keyword: string, bounds: Bounds): void
      getResults(): LocalResult
      clearResults(): void
      enableAutoViewport(): void
      disableAutoViewport(): void
      setPageCapacity(capacity: number): void
      getPageCapacity(): number
      gotoPage(page: number): void
    }

    interface LocalSearchOptions {
      renderOptions?: RenderOptions
      onSearchComplete?: (results: LocalResult) => void
      pageCapacity?: number
    }

    interface RenderOptions {
      map?: Map
      panel?: string | HTMLElement
      selectFirstResult?: boolean
      autoViewport?: boolean
    }

    interface LocalResult {
      keyword: string
      city: string
      moreResultsUrl: string
      getPoi(i: number): LocalResultPoi
      getNumPois(): number
      getCurrentNumPois(): number
    }

    interface LocalResultPoi {
      point: Point
      title: string
      url: string
      address: string
      city: string
      phoneNumber: string
      postCode: string
      type: number
      isAccurate: boolean
    }

    /* 工具类 */
    class Geolocation {
      constructor()
      getCurrentPosition(callback: (result: GeolocationResult) => void, options?: PositionOptions): void
      getStatus(): ServiceStatusCode
    }

    interface GeolocationResult {
      point: Point
      accuracy?: number
      address?: AddressComponent
    }

    interface PositionOptions {
      enableHighAccuracy?: boolean
      timeout?: number
      maximumAge?: number
      provider?: string
    }

    type ServiceStatusCode =
      | "BMAP_STATUS_SUCCESS"
      | "BMAP_STATUS_CITY_LIST"
      | "BMAP_STATUS_UNKNOWN_LOCATION"
      | "BMAP_STATUS_UNKNOWN_ROUTE"
      | "BMAP_STATUS_INVALID_KEY"
      | "BMAP_STATUS_INVALID_REQUEST"
      | "BMAP_STATUS_PERMISSION_DENIED"
      | "BMAP_STATUS_SERVICE_UNAVAILABLE"
      | "BMAP_STATUS_TIMEOUT"

    /* 其他工具类 */
    class Convertor {
      static translate(
        points: Point[],
        from: number,
        to: number,
        callback: (status: number, result: Point[]) => void,
      ): void
    }

    class DistanceTool {
      constructor(map: Map)
      open(): void
      close(): void
    }

    class DragAndZoomTool {
      constructor(map: Map, opts?: DragAndZoomOptions)
      open(): boolean
      close(): void
    }

    interface DragAndZoomOptions {
      autoClose?: boolean
      followText?: string
      startTipText?: string
      endTipText?: string
    }

    /* 常量 */
    const ANCHOR_TOP_LEFT: ControlAnchor
    const ANCHOR_TOP_RIGHT: ControlAnchor
    const ANCHOR_BOTTOM_LEFT: ControlAnchor
    const ANCHOR_BOTTOM_RIGHT: ControlAnchor

    const NAVIGATION_CONTROL_LARGE: NavigationControlType
    const NAVIGATION_CONTROL_SMALL: NavigationControlType
    const NAVIGATION_CONTROL_PAN: NavigationControlType
    const NAVIGATION_CONTROL_ZOOM: NavigationControlType

    const UNIT_METRIC: LengthUnit
    const UNIT_IMPERIAL: LengthUnit

    const STATUS_SUCCESS: ServiceStatusCode
    const STATUS_INVALID_REQUEST: ServiceStatusCode
    const STATUS_PERMISSION_DENIED: ServiceStatusCode
    const STATUS_SERVICE_UNAVAILABLE: ServiceStatusCode
    const STATUS_TIMEOUT: ServiceStatusCode
  }
  interface Window {
    BMap: typeof BMap
  }
}
export {}
