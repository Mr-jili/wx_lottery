import { createApp } from "vue";
import {
    Button,
    Toast,
    Input,
    Form,
    Avatar,
    Cell,
    FormItem,
    Calendar,
    Popup,
    Navbar,
    Tabs,
    TabPane,
    Table,
    Divider,
    Menu,
    MenuItem,
    Empty,
    Icon,
    Popover,
    OverLay,
    Checkbox,
    CellGroup,
    Dialog
} from "@nutui/nutui-taro";
import Taro from '@tarojs/taro'

import "./app.scss";

const App = createApp({
    onShow(options) {
       
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(Button)
    .use(Toast)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(Calendar)
    .use(Avatar)
    .use(Cell)
    .use(Popup)
    .use(Navbar)
    .use(Tabs)
    .use(TabPane)
    .use(Divider)
    .use(Menu)
    .use(MenuItem)
    .use(Table)
    .use(Empty)
    .use(Popover)
    .use(OverLay)
    .use(Checkbox)
    .use(CellGroup)
    .use(Dialog)
    .use(Icon);

export default App;
