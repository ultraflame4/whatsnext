
declare namespace Trello {

    interface TrelloAuthorizationScope {
        read?: boolean
        write?: boolean
        account?: boolean
    }

    interface TrelloAuthorizationOptions {
        type?: "redirect" | "popup"
        name?: string
        persist?: boolean
        interactive?: boolean
        scope?: TrelloAuthorizationScope
        expiration?: "1hour" | "1day" | "30days" | "never"
        success?: () => void
        error?: () => void
    }

    function authorize(opts: TrelloAuthorizationOptions);

    function rest(method: "GET" | "POST" | "PUT" | "DELETE", path: string, params?: Object, success?: () => void, error?: () => void);

    function get(path: string, params?: Object, success?: () => void, error?: () => void);

    function post(path: string, params?: Object, success?: () => void, error?: () => void);

    function put(path: string, params?: Object, success?: () => void, error?: () => void);

    function del(path: string, params?: Object, success?: () => void, error?: () => void);

    /**
     * Action Object
     *
     * @property {string} id The ID of the action
     *
     * @property {Object} data    Relevant information regarding the action
     *
     * @property {string} date    When the action occurred
     *
     * @property {string} idMemberCreator    The ID of the member who caused the action
     *
     * @property {string} type    The type of the action. See list of Action Types for options.
     */
    interface ActionObject {
        id: string
        data: Object
        date: string
        idMemberCreator: string
        type: string
    }


    interface ImageAttachementPreviewObject {
        id: string
        _id: string
        scaled: boolean
        url: string
        bytes: number
        height: number
        width: number
    }

    /**
     * Attachment Object
     * @property {string} id The ID of the attachment
     * @property {number} bytes The size of the attachment in bytes
     * @property {string} date The date the attachment was added
     * @property {string} edgeColor For image attachments, the extracted edge color (in hexadecimal format)
     * @property {string} idMember The ID of the member who added the attachment
     * @property {string} isUpload Whether the attachment was uploaded
     * @property {string} mimeType The MIME type of the attachment
     * @property {string} name The name of the attachment
     * @property {number} pos The position of the attachment in the attachments list
     * @property {string} previews An array of previews for the attachment
     * @property {string} url The URL of the attachment
     */
    interface AttachmentObject {
        id: string,
        bytes: number,
        date: string,
        edgeColor: string,
        idMember: string,
        isUpload: boolean,
        mimeType: string,
        name: string,
        pos: number,
        previews: Array<Object>,
        url: string
    }

    interface ImageDescriptor {
        url: string
        height: number
        width: number
    }

    interface PreferencesObject{
        permissionLevel: "board" | "org"
        hideVotes: boolean,
        voting: "enabled" | "disabled"
        comments: string
        invitations: any
        selfJoin: boolean
        cardCovers: boolean
        isTemplate: boolean
        cardAging: "regular" | "pirate"
        calendarFeedEnabled: boolean
        background: string
        backgroundImage: string
        backgroundImageScaled: Array<ImageDescriptor>,
        backgroundTile: boolean
        backgroundBrightness: string
        backgroundBottomColor: string
        backgroundTopColor: string
        canBePublic: boolean
        canBeEnterprise: boolean
        canBeOrg: boolean
        canBePrivate: boolean
        canInvite: boolean
    }

    type LabelColors = "green" | "yellow" | "orange" | "red" | "purple" | "blue" | "sky" | "lime" | "pink" | "black"

    interface LabelNames{
        [key: LabelColors]: string
    }

    interface BoardObject {
        id: string
        name: string
        desc: string
        descData: string
        closed: boolean
        idMemberCreator: string
        idOrganization: string
        pinned: boolean
        url: string
        shortUrl: string
        prefs: PreferencesObject
        labelNames: LabelNames


    }
}

declare namespace Trello.actions {
    function get(id: string, params?: { display?: boolean, entities?: false, fields?: string, member?: boolean, member_fields?: string, }, success?: () => void, error?: () => void);
}
declare namespace Trello.cards {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}
declare namespace Trello.checklists {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}

declare namespace Trello.boards {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}

declare namespace Trello.lists {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}

declare namespace Trello.members {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}

declare namespace Trello.organizations {
    function get(id: string, params?: Object, success?: () => void, error?: () => void);
}
