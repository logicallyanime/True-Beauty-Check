type MessageType = 'text' | 'sticker' | 'image' | 'video' | 'audio' | 'location' | 'imagemap'



export interface Messages{
    type: MessageType
}

export interface Text extends Messages{
    text: string
}

export interface Sticker extends Messages{
    packageId: number,
    stickerId: number
}

export interface Text extends Messages{
    originalContentUrl: string,
    previewImageUrl: string
}

interface VideoURL {
    originalContentUrl: string,
    previewImageUrl: string,
}

export interface Video extends Messages,VideoURL{
    trackingId: string,
}

export interface Text extends Messages{
    originalContentUrl: string,
    duration: number
}

export interface Location extends Messages{
    title: string,
    address: string,
    latitude: number,
    longitude: number
}

export interface ImageMap extends Messages{
    baseUrl: string,
    altText: string,
    baseSize: Size,
    video: ImageMapVideo,
    actions: ImageMapURI[] | ImageMapMessage[]
}

interface Size{
    width: number,
    height: number
}

interface ImageMapVideo extends VideoURL{
    area?: Area,
    externalLinks?: Links
}

interface Area extends Size{
    x: number,
    y: string
}

interface Links{
    linkUri: string,
    label: string
}

interface ImageMapURI extends Links{
    type: 'uri',
    area: Area
}

interface ImageMapMessage extends MessageAction{
    area: Area
}

export interface Template extends Messages{
    altText: string,
    template: TemplateObjects
}

type TemplateObjects = Buttons | Confirm | Carousel | ImageCarousel | Flex

type ImageAspectRatio = 'rectangle' | 'square'
type ImageSize = 'cover' | 'contain'

interface Buttons {
    type: "buttons",
    thumbnailImageUrl: string,
    imageAspectRatio: ImageAspectRatio,
    imageSize: ImageSize,
    imageBackgroundColor: string | '#FFFFFF',
    title?: string,
    text: string,
    defaultAction?: ActionObject,
    actions: ActionObject[]
}

type ActionObject = PostbackAction | MessageAction | URIAction | DatetimePickerAction;

interface PostbackAction{
    type: 'postback',
    label?: string,
    data: string,
    displayText?: string,
    text?: string
}

interface MessageAction{
    type: 'message',
    label?: string,
    text: string
}

interface URIAction extends Links{
    type: "uri",
    altUri: {desktop: string}
}

interface DatetimePickerAction{
    type: "datetimepicker",
    label: string,
    data: string,
    mode: 'date' | "time" | "datetime",
    initial?: string,
    max: string,
    min: string
}

interface Confirm{
    type: "confirm",
    text: string,
    actions: ActionObject[]
}

interface Carousel{
    type: "carousel",
    columns: ColumnObject[],
    imageAspectRatio?: ImageAspectRatio,
    imageSize?: ImageSize
}

interface ColumnObject{
    thumbnailImageUrl?: string,
    imageBackgroundColor?:string | '#FFFFFF',
    title?: string,
    text: string,
    defaultAction?: ActionObject,
    actions: ActionObject[]
}
interface ImageCarousel{
    type: "image_carousel",
    columns: ImageColumnObject[]
}

interface ImageColumnObject{
    imageUrl: string,
    action: ActionObject
}

interface Flex {
    type: "flex",
    altText: string,
    contents: FlexBubble | FlexCarousel
}

type BubbleSize = "nano" | "micro" | "kilo" | "mega" | "giga"
interface FlexBubble{
    type: "bubble",
    size?: BubbleSize,
    direction?: "ltr" | "rtl",
    header?: Box,
    hero?: Box | ImageComponent,
    body?: Box,
    footer?: Box,
    styles?: BubbleStyle,
    action?: ActionObject
}

interface BubbleStyle{
    header?: BoxStyle,
    hero?: BoxStyle,
    body?: BoxStyle,
    footer?: BoxStyle
}

interface BoxStyle{
    backgroundColor?: string,
    separator?: boolean,
    separatorColor?: string
}

interface FlexCarousel{
    type: "carousel",
    contents: FlexBubble[]
}

type Component = Box | ButtonComponent | ImageComponent | 
                    IconComponent | TextComponent | Span | 
                    Separator | Filler


interface Box {
    type: "box",
    layout: "horizontal" | "vertical" | "baseline",
    contents: Component[],
    backgroundColor?: string,
    borderColor?: string,
    borderWidth?: string,
    cornerRadius?: string,
    width?: string,
    height?: string,
    flex?: number,
    spacing?: string,
    margin?: string,
    paddingAll?: string,
    paddingTop?: string,
    paddingBottom?: string,
    paddingStart?: string,
    paddingEnd?: string,
    position?: 'relative' | 'absolute',
    offsetTop?: string,
    offsetBottom?: string,
    offsetStart?: string,
    offsetEnd?: string,
    action?: ActionObject,
    justifyContent?: string,
    alignItems?: string,
    background?: BoxBackground
}

interface BoxBackground{
    type: "linear" | "gradient",
    angle?: string,
    startColor?: string,
    endColor?: string,
    centerColor?: string,
    centerPosition?: string
}

interface ButtonComponent{
    type: "button",
    action: ActionObject,
    flex?: number,
    margin?: string,
    position?: 'relative' | 'absolute',
    offsetTop?: string,
    offsetBottom?: string,
    offsetStart?: string,
    offsetEnd?: string,
    height?: "sm" | "md",
    style?: "primary" | "secondary" | "link",
    color?: string,
    gravity?: string,
    adjustMode?: string
}

interface ImageComponent{
    type: "image",
    url: string,
    flex?: number,
    margin?: string,
    position?: 'relative' | 'absolute',
    offsetTop?: string,
    offsetBottom?: string,
    offsetStart?: string,
    offsetEnd?: string,
    height?: "sm" | "md",
    style?: "primary" | "secondary" | "link",
    align?: string,
    gravity?: string,
    size?: string,
    aspectRatio?: string,
    adjustMode?: string,
    backgroundColor?: string,
    action?: ActionObject,
    animated?: boolean
}

interface IconComponent{
    type: "icon",
    url: string,
    margin?: string,
    position?: 'relative' | 'absolute',
    offsetTop?: string,
    offsetBottom?: string,
    offsetStart?: string,
    offsetEnd?: string,
    size?: string,
    aspectRatio?: string
}

interface TextComponent {
    type: "text",
    text: string,
    contents: Span[],
    adjustMode?: string,
    flex?: number,
    margin?: string,
    position?: 'relative' | 'absolute',
    offsetTop?: string,
    offsetBottom?: string,
    offsetStart?: string,
    offsetEnd?: string,
    size?: string,
    gravity?: string,
    height?: "sm" | "md",
    align?: string,
    wrap?: boolean,
    maxLines?: number,
    weight?: string,
    color?: string,
    action?: ActionObject,
    style?: "normal" | "italic",
    decoration?: "none" | "underline" | "line-through"
}

interface Span {
    type: "span",
    text?: string,
    color?: string,
    size?: string,
    weight?: string,
    style?: "normal" | "italic",
    decoration?: "none" | "underline" | "line-through"
}

interface Separator{
    type: "separator",
    margin?: string,
    color?: string
}

interface Filler{
    type: "filler",
    flex?: number
}