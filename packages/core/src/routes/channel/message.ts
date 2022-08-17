import { AllowMentionsData, AttachmentData, EmbedAuthorData, EmbedData, EmbedFieldData, EmbedFooterData, HttpRequestData, isHttpRequestData, isSnowflake, MessageComponentData, MessageFlag, MessageReferenceData, SnowflakeData } from '@discall/types';
import { isEmpty } from '../../utils';

interface CreateMessageSettings {
    content?: string;
    embeds?: EmbedData[];
    attachments?: AttachmentData[];
    sticker_ids?: SnowflakeData[];
}

interface CreateMessageOptions {
    tts?: boolean;
    allowed_mentions?: AllowMentionsData;
    message_reference?: MessageReferenceData;
    components?: MessageComponentData[];
    flags?: MessageFlag;
}

interface EditMessageSettings {
    content?: string | null;
    embeds?: EmbedData[] | null;
    attachments?: AttachmentData[] | null;
}

interface EditMessageOptions {
    allowed_mentions?: AllowMentionsData | null;
    components?: MessageComponentData[] | null;
    flags?: MessageFlag | null;
}

export default function message<T extends typeof message>(id: SnowflakeData): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function message(data_1: any, data_2: any, data_3: SnowflakeData): HttpRequestData;
export default function message(data: HttpRequestData): HttpRequestData;
export default function message(settings: CreateMessageSettings, options?: CreateMessageOptions): HttpRequestData;
export default function message(settings: EditMessageSettings, options?: EditMessageOptions): HttpRequestData;
export default function message<T extends typeof message = typeof message>(
    arg_1: CreateMessageSettings | EditMessageSettings | SnowflakeData | HttpRequestData,
    arg_2: CreateMessageOptions | EditMessageOptions = {},
    arg_3?: SnowflakeData
): HttpRequestData | T {
    if (arg_3 && isSnowflake(arg_3))
        return {
            type: 'id',
            data: {
                message_id: arg_3,
                data: message(arg_1 as never, arg_2)
            }
        };

    if (isSnowflake(arg_1))
        return ((param_1: unknown, param_2?: unknown) => message(param_1, param_2, arg_1)) as T;

    if (isHttpRequestData(arg_1))
        return {
            type: 'message',
            data: arg_1
        };

    return {
        type: 'message',
        data: { ...arg_1, ...arg_2 }
    };
}

export function attachments(files: Record<string, string>): Partial<AttachmentData>[] {
    if (isEmpty(files))
        return [];

    const results: Partial<AttachmentData>[] = [];
    let idx = 0;
    for (const file in files) {
        results.push({
            id: idx.toString(),
            description: files[file],
            filename: file
        }); idx++;
    }

    return results;
}

export function embeds(embeds: {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: EmbedFooterData;
    image?: string;
    thumbnail?: string;
    author?: EmbedAuthorData;
    fields?: EmbedFieldData[];
}[]) {
    const result: EmbedData[] = [];
    const files: Record<string, string> = {};

    for (const data of embeds.values()) {
        const obj: EmbedData = {
            title: data.title,
            description: data.description,
            url: data.url,
            timestamp: data.timestamp?.toISOString(),
            color: data.color,
            footer: data.footer,
            author: data.author,
            fields: data.fields
        };

        if (data.image !== undefined && !isEmpty(data.image)) {
            const { url, file } = pathToUrlWithFile(data.image);
            obj.image = { url };

            if (file)
                files[file] = '';
        }

        if (data.thumbnail !== undefined && !isEmpty(data.thumbnail)) {
            const { url, file } = pathToUrlWithFile(data.thumbnail);
            obj.thumbnail = { url };

            if (file)
                files[file] = '';
        }

        if (!isEmpty(obj))
            result.push({ ...obj, type: 'rich' });
    }

    return { embeds: result, attachments: attachments(files) };
}

function pathToUrlWithFile(path: string): {
    url: string,
    file: string | null
} {
    if (path.startsWith('https://'))
        return { url: path, file: null };

    if (path.startsWith('attachment://'))
        return { url: path, file: path.split('attachment://')[1] };

    return { url: 'attachment://' + path.split('/').slice(-1), file: path };
}