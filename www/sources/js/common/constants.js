﻿import LanguageHelper from './langHelper';

export const PAGING_SIZES = [100, 200, 300, 400, 500, 1000];

export const DefaultPageSize = 100;

export const DateFormat = 'MM/dd/yyyy';

export const DateTimeFormat = 'MM/dd/yyyy hh:mm:ss a';

export const TimeFormat = 'hh:mm:ss a';

export const MappingStatus = {
    'BotRemoved': 0,
    'NotMapped': 1,
    'Mapped': 2
};

export const ChatTypeMapping = {
    'Personal': 2,
    'Group': 1
};

export const MULTI_SELECT_TEXT_OPTIONS = {
    Texts: LanguageHelper.getResource('All'),
    SelectedItemCount: '# selected',
    SelectOptions: LanguageHelper.getResource('PleaseSelect'),
    NoData: LanguageHelper.getResource('NoData')
};

export const AUTO_REFRESH_TIMES = [90, 120, 150, 180];