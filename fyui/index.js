Page({
    data: {
        list: [
            {
                id: 'form',
                name: '模块',
                open: false,
                pages: ['login']
            },
            {
                id: 'widget',
                name: '示例组件',
                open: false,
                pages: ['button']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
});
