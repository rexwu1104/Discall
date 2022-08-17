import { HttpRequestData, SnowflakeData, ImageScheme, RoleData, ChannelTypes, VerificationLevel, DefaultMessageNotificationLevel, ExplicitContentFilterLevel, SystemChannelFlags, LocaleOption, isSnowflake, isHttpRequestData } from '@discall/types';

interface CreateGuildSettings {
    name: string;
    icon?: ImageScheme | null;
    roles?: RoleData[];
    channels?: {
        name: string;
        type: ChannelTypes;
        id?: SnowflakeData;
        parent_id?: SnowflakeData;
    }
}

interface CreateGuildOptions {
    verification_level?: VerificationLevel | null;
    default_message_notifications?: DefaultMessageNotificationLevel | null;
    explict_content_filter?: ExplicitContentFilterLevel | null;
    afk_channel_id?: SnowflakeData | null;
    afk_timeout?: number;
    system_channel_id?: SnowflakeData | null;
    system_channel_flags?: SystemChannelFlags;
}

interface ModifyGuildSettings {
    name?: string;
    icon?: ImageScheme | null;
    description?: string | null;
    splash?: ImageScheme | null;
    discordvey_splash?: ImageScheme | null;
    banner?: ImageScheme | null;
    owner_id?: SnowflakeData;
}

interface ModifyGuildOptions {
    verification_level?: VerificationLevel | null;
    default_message_notifications?: DefaultMessageNotificationLevel | null;
    explict_content_filter?: ExplicitContentFilterLevel | null;
    afk_channel_id?: SnowflakeData | null;
    afk_timeout?: number;
    system_channel_id?: SnowflakeData | null;
    system_channel_flags?: SystemChannelFlags;
    rules_channel_id?: SnowflakeData | null;
    public_updates_channel_id?: SnowflakeData | null;
    preferred_locale?: LocaleOption | null;
    premium_progress_bar_enabled?: boolean;
}

export default function guild<T extends typeof guild>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function guild(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function guild(data: HttpRequestData): HttpRequestData;
export default function guild(settings: CreateGuildSettings, options?: CreateGuildOptions): HttpRequestData;
export default function guild(settings: ModifyGuildSettings, options?: ModifyGuildOptions): HttpRequestData;
export default function guild<T extends typeof guild>(
    arg_1: CreateGuildSettings | ModifyGuildSettings | SnowflakeData | HttpRequestData,
    arg_2: CreateGuildOptions | ModifyGuildOptions = {},
    arg_3?: SnowflakeData
): HttpRequestData | T {
    if (arg_3 && isSnowflake(arg_3))
        return {
            type: 'id',
            data: {
                guild_id: arg_3,
                data: guild(arg_1 as never, arg_2)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown, param_2: unknown) => guild(param_1, param_2, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'guild',
            data: arg_1
        };

    return {
        type: 'channel',
        data: { ...arg_1, ...arg_2 }
    };
}