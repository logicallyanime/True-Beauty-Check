export interface VIKI_API {
id: string
content_owners: ContentOwner[]
created_at: string
updated_at: string
type: string
duration: number
number: number
root_id: string
origin: Origin
titles: Titles
titles_phonetic: TitlesPhonetic
titles_aka: TitlesAka
kaltura_id: any
descriptions: Descriptions
subtitle_completions: SubtitleCompletions
container: Container
hardsubs: any[]
hardsub_languages: any[]
source: string
images: Images3
likes: Likes
flags: Flags
url: Url3
embed: Embed
rating: string
parts: Part[]
viki_air_time: number
credits_marker: number
part_index: number
author: string
author_url: string
blocked: boolean
blocking: Blocking
verticals?: Vertical[]
}

export interface ContentOwner {
id: string
}

export interface Origin {
language: string
}

export interface Titles {}

export interface TitlesPhonetic {}

export interface TitlesAka {}

export interface Descriptions {}

export interface SubtitleCompletions {
ar?: number
bg?: number
ca?: number
cs?: number
de?: number
el?: number
en?: number
es?: number
et?: number
fi?: number
fr?: number
hi?: number
hr?: number
hu?: number
id?: number
it?: number
ja?: number
ko?: number
lt?: number
nl?: number
pl?: number
pt?: number
ro?: number
sr?: number
sv?: number
tr?: number
zh?: number
}

export interface Container {
id: string
type: string
subtype: string
titles: Titles2
team_name: string
genres: string[]
origin: Origin2
managers: Manager[]
images: Images2
url: Url
review_stats: ReviewStats
planned_episodes: number
}

export interface Titles2 {
en: string
ko: string
pt: string
it: string
ja: string
de: string
zt: string
zh: string
fr: string
es: string
}

export interface Origin2 {
country: string
language: string
}

export interface Manager {
id: string
username: string
images: Images
url: Url
}

export interface Images {
avatar: Avatar
}

export interface Avatar {
url: any
}

export interface Url {
web: string
api: string
}

export interface Images2 {
atv_cover: UrlSource
poster: UrlSource
}

export interface UrlSource {  //AtvCover
url: string
source: string
}

export interface ReviewStats {
average_rating: number
count: number
}

export interface Images3 {
poster: UrlSource
}

export interface Likes {
count: number
}

export interface Flags {
licensed: boolean
hosted: boolean
on_air: boolean
embeddable: boolean
state: string
adult: boolean
hd: boolean
has_stream: boolean
exclusive: boolean
original: boolean
}

export interface Url3 {
api: string
fb: string
web: string
}

export interface Embed {
iframe: Iframe
}

export interface Iframe {
url: string
}

export interface Part {
id: string
part: number
url: string
}

export interface Blocking {
geo: boolean
paywall: boolean
upcoming: boolean
}

export interface Vertical {
effective_from: string
free: number
timed: number
vertical_id: string
url: Url
type: string
released_at: string
id: string
}
  