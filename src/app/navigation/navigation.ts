import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'collapsable',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },

    {
        id       : 'configuration',
        title    : 'Configuration',
        translate: 'NAV.CONFIGURATION',
        type     : 'item',
        icon     : 'settings',
        url      : '/variant'
    },

    {
        id       : 'master',
        title    : 'Master',
        translate: 'NAV.MASTER.TITLE',
        type     : 'item',
        icon     : 'developer_board',
        url      : '/master'
    }
];
