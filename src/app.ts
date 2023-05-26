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
} from "@nutui/nutui-taro";
import { TurnTable } from "@nutui/nutui-bingo-taro";

import "@nutui/nutui-bingo/dist/style.css";
import "./app.scss";

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(Button)
  .use(Toast)
  .use(TurnTable)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Calendar)
  .use(Avatar)
  .use(Cell)
  .use(Popup);

export default App;
