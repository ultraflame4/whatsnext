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

    interface TrelloApiError {
        code: string
        message: string
    }

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

    interface PreferencesObject {
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

    interface LabelNames {
        [key: LabelColors]: string
    }


    interface LimitsObject {
        status: "ok" | "warning"
        disableAt: number
        warnAt: number
    }

    interface Limits {
        attachements: { perBoard: LimitsObject }
    }

    interface BoardObject {
        id: string
        name: string
        desc: string
        descData?: string
        closed: boolean
        idMemberCreator: string
        idOrganization: string
        pinned: boolean
        url: string
        shortUrl: string
        prefs: PreferencesObject
        labelNames: LabelNames
        limits: Limits
        starred: boolean
        memberships: string
        shortLink: string
        powerUps: string
        dateLastActivity: string
        dateLastView: string
        idTags: string
        datePluginDisable?: string
        creationMethod?: string
        ixUpdate: number
        templateGallery?: string
        enterpriseOwned: boolean

    }

    interface CardBadges{
        attachmentsByTypes:Object
        location:boolean
        votes:number
        viewingMemberVoted:boolean
        subscribed:boolean
        fogbugz:string
        checkItems:number
        checkItemsChecked:number
        comments:number
        attachments:number
        description:boolean
        due?:string
        start?:string
        dueComplete:boolean
    }

    interface CardCover{
        idAttachment:string
        color?:LabelColors
        idUploadedBackground?:boolean
        size?: "normal"
        brightness?: "light" | "dark"
        isTemplate?: boolean
    }

    interface CardObject{
        id: string
        address: string
        badges:CardBadges
        checkItemStates: Array<string>
        closed: boolean
        coordinates?:string
        creationMethod?: string
        dateLastActivity: string
        desc: string
        descData: Object
        due?: string
        dueReminder?: boolean
        email: string
        idBoard: string
        idChecklists: Array<string|{id:string}>
        idLabel: Array<string|{id:string,idBoard:string,name:string,color?:LabelColors}>
        idList: string
        idMembers: Array<string>
        idMembersVoted: Array<string>
        idShort: number
        idAttachmentCover: string
        labels: string[]
        limits: Limits
        locationName?: string
        manualCoverAttachment: boolean
        name: string
        pos: number
        shortLink: string
        shortUrl: string
        subscribed: boolean
        cover:CardCover
    }
}
type errorCallback = (e: Trello.TrelloApiError) => void;

declare namespace NestedResources {
    /**
     // * @deprecated
     * DO NOT USE THIS. THIS IS A TYPE PLACEHOLDER FOR NESTED RESOURCES
     */
    type NestedResource = any
}

declare namespace Trello.actions {
    interface GetActionsParam {
        display?: boolean,
        entities?: false,
        fields?: string,
        member?: boolean,
        member_fields?: string,
        memberCreator?: boolean,
        memberCreator_fields?: string,
    }

    function get(id: string, params?: GetActionsParam, success?: (data: Object) => void, error?: errorCallback);
}


declare namespace Trello.boards {
    interface GetBoardParam {
        actions?: string
        boardStars?: "mime" | "none"
        cards?: string
        card_pluginData?: boolean
        checklists?: string
        customFields?: boolean
        fields?: string
        labels?: string
        lists?: string
        members?: string
        memberships?: string
        pluginData?: boolean
        organization?: boolean
        organization_pluginData?: boolean
        myPrefs?: boolean
        tags?: boolean
    }

    function get(id: string, params?: GetBoardParam, success?: (data: BoardObject) => void, error?: errorCallback);
}
declare namespace Trello.cards {
    interface GetCardParam {
        fields?: string
        actions?: string
        attachments?: string
        attachment_fields?: string
        members?: boolean
        members_fields?: boolean
        membersVoted?: boolean
        membersVoted_fields?: string
        checkItemStates?: boolean
        checklists?: "all" | "none"
        checklists_fields?: string
        board_fields?:string
        list?:boolean
        pluginData?: boolean
        stickers?: boolean
        stickers_fields?: string
        customFieldItems?: boolean
    }
    function get(id: string, params?: GetCardParam, success?: (data: CardObject) => void, error?: errorCallback);
}
declare namespace Trello.checklists {
    /**
     * https://developer.atlassian.com/cloud/trello/rest/api-group-checklists/#api-checklists-id-get
     */
    interface GetChecklistParams{
        cards?: NestedResources.NestedResource
        checkItems?: "all" | "none"
        checkItems_fields?: string
        fields?: string
    }
    function get(id: string, params?: GetChecklistParams, success?: (data: Object) => void, error?: errorCallback);
}

declare namespace Trello.lists {
    function get(id: string, params?: Object, success?: (data: Object) => void, error?: errorCallback);
}

declare namespace Trello.members {
    function get(id: string, params?: Object, success?: (data: Object) => void, error?: errorCallback);
}

declare namespace Trello.organizations {
    function get(id: string, params?: Object, success?: (data: Object) => void, error?: errorCallback);
}
