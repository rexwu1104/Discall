export enum HttpMode {
    GET,
    DELETE,
    POST,
    PUT,
    PATCH
}

export interface HttpRequest {
    uri: (base: URL) => { uri: string, mode: HttpMode };
    data?: unknown;
    cache?: (() => unknown) | ((data: unknown) => void);
    reason?: string;
}

export interface HttpRequestData {
    type: string;
    data: HttpRequestData | IdData | Record<string, unknown> | Record<string, never>;
}

export interface IdData {
    data: HttpRequestData;
}

export enum HttpUri {
    'get+id+guild+audit' = '/guilds/{guild_id}/audit-logs{query}',
    'get+id+guild+moderation' = '/guilds/{guild_id}/auto-moderation/rules',
    'get+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'create+id+guild+moderation' = '/guilds/{guild_id}/auto-moderation/rules',
    'edit+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'remove+id+guild+id+moderation' = '/guilds/{guild_id}/auto-moderation/rules/{moderation_id}',
    'get+id+channel' = '/channels/{channel_id}',
    'edit+id+channel' = '/channels/{channel_id}',
    'remove+id+channel' = '/channels/{channel_id}',
    'get+id+channel+message' = '/channels/{channel_id}/messages',
    'get+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'create+id+channel+message' = '/channels/{channel_id}/messages',
    'create+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}/crosspost',
    'create+id+channel+id+message+client+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+client+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'remove+id+channel+id+message+id+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}',
    'get+id+channel+id+message+all+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}{query}',
    'remove+id+channel+id+message+all+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions',
    'remove+id+channel+id+message+all+emoji+reaction' = '/channels/{channel_id}/messages/{message_id}/reactions/{emoji}',
    'edit+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'remove+id+channel+id+message' = '/channels/{channel_id}/messages/{message_id}',
    'remove+id+channel+message' = '/channels/{channel_id}/messages/bulk-delete',
    'edit+id+channel+id+permission' = '/channels/{channel_id}/permissions/{overwrite_id}',
    'get+id+channel+invite' = '/channels/{channel_id}/invites',
    'create+id+channel+invite' = '/channels/{channel_id}/invites',
    'remove+id+channel+id+permission' = '/channels/{channel_id}/permissions/{overwrite_id}',
    'create+id+channel' = '/channels/{channel_id}/followers',
    'create+id+channel+empty' = '/channels/{channel_id}/typing',
    'get+id+channel+pins' = '/channels/{channel_id}/pins',
    'edit+id+channel+pins' =  '/channels/{channel_id}/pins/{message_id}',
    'remove+id+channel+pins' =  '/channels/{channel_id}/pins/{message_id}',
    'edit+id+channel+id+group' = '/channels/{channel_id}/recipents/{user_id}',
    'remove+id+channel+id+group' = '/channels/{channel_id}/recipents/{user_id}',
    'create+id+channel+id+message+thread' = '/channels/{channel_id}/messages/{message_id}/threads',
    'create+id+channel+thread' = '/channels/{channel_id}/threads',
    'edit+id+channel+thread' = '/channels/{channel_id}/thread-members/@me',
    'edit+id+channel+thread+id+member' = '/channel/{channel_id}/thread-members/{user_id}',
    'remove+id+channel+thread' = '/channels/{channel_id}/thread-members/@me',
    'remove+id+channel+thread+id+member' = '/channel/{channel_id}/thread-members/{user_id}',
    'get+id+channel+thread' = '/channels/{channel_id}/thread-members/@me',
    'get+id+channel+thread+id+member' = '/channel/{channel_id}/thread-members/{user_id}',
    'get+id+channel+thread+member' = '/channel/{channel_id}/thread-members',
    'get+id+channel+public+thread' = '/channel/{channel_id}/thread/archived/public',
    'get+id+channel+private+thread' = '/channel/{channel_id}/thread/archived/private',
    'get+id+channel+joined+thread' = '/channel/{channel_id}/users/@me/thread/archived/private'
}

export enum UriMode {
    'get+id+guild+audit' = HttpMode.GET,
    'get+id+guild+moderation' = HttpMode.GET,
    'get+id+guild+id+moderation' = HttpMode.GET,
    'create+id+guild+moderation' = HttpMode.POST,
    'edit+id+guild+id+moderation' = HttpMode.PATCH,
    'remove+id+guild+id+moderation' = HttpMode.DELETE,
    'get+id+channel' = HttpMode.GET,
    'edit+id+channel' = HttpMode.PATCH,
    'remove+id+channel' = HttpMode.DELETE,
    'get+id+channel+message' = HttpMode.GET,
    'get+id+channel+id+message' = HttpMode.GET,
    'create+id+channel+message' = HttpMode.POST,
    'create+id+channel+id+message' = HttpMode.POST,
    'reate+id+channel+id+message+client+emoji+reaction' = HttpMode.PUT,
    'remove+id+channel+id+message+client+emoji+reaction' = HttpMode.DELETE,
    'remove+id+channel+id+message+id+emoji+reaction' = HttpMode.DELETE,
    'get+id+channel+id+message+all+emoji+reaction' = HttpMode.GET,
    'remove+id+channel+id+message+all+reaction' = HttpMode.DELETE,
    'remove+id+channel+id+message+all+emoji+reaction' = HttpMode.DELETE,
    'edit+id+channel+id+message' = HttpMode.PATCH,
    'remove+id+channel+id+message' = HttpMode.DELETE,
    'remove+id+channel+message' = HttpMode.POST,
    'edit+id+channel+id+permission' = HttpMode.PUT,
    'get+id+channel+invite' = HttpMode.GET,
    'create+id+channel+invite' = HttpMode.POST,
    'remove+id+channel+id+permission' = HttpMode.DELETE,
    'create+id+channel' = HttpMode.POST,
    'create+id+channel+empty' = HttpMode.POST,
    'get+id+channel+pins' = HttpMode.GET,
    'edit+id+channel+pins' =  HttpMode.PUT,
    'remove+id+channel+pins' =  HttpMode.DELETE,
    'edit+id+channel+id+group' = HttpMode.PUT,
    'remove+id+channel+id+group' = HttpMode.DELETE,
    'create+id+channel+id+message+thread' = HttpMode.POST,
    'create+id+channel+thread' = HttpMode.POST,
    'edit+id+channel+thread' = HttpMode.PUT,
    'edit+id+channel+thread+id+member' = HttpMode.PUT,
    'remove+id+channel+thread' = HttpMode.DELETE,
    'remove+id+channel+thread+id+member' = HttpMode.DELETE,
    'get+id+channel+thread' = HttpMode.GET,
    'get+id+channel+thread+id+member' = HttpMode.GET,
    'get+id+channel+thread+member' = HttpMode.GET,
    'get+id+channel+public+thread' = HttpMode.GET,
    'get+id+channel+private+thread' = HttpMode.GET,
    'get+id+channel+joined+thread' = HttpMode.GET
}