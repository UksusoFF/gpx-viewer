const IconMap: Record<string, string> = {
    'park': 'pine-tree',
    'parking': 'parking',
    'restaurants': 'silverware',
    'special_house': 'home',
    'special_photo_camera': 'camera',
    'special_star': 'star',
    'special_star_stroked': 'star-outline',
    'tourism_viewpoint': 'asterisk',
};

class Icon {

    static getIcon(key: string):string {
        let icon = IconMap[key];

        return typeof icon !== 'undefined' ? icon : IconMap['special_star'];
    }
}

export {
    Icon,
};