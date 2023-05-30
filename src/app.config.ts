export default defineAppConfig({
	pages: [
		'pages/home/index',
		'pages/login/index',
		'pages/mine/index',
		'pages/history/index',
		'pages/estimate/index'
	],
	tabBar: {
		color: "#666",
		selectedColor: "#b4282d",
		backgroundColor: "#fafafa",
		borderStyle: 'black',
		list: [
			{
				pagePath: "pages/home/index",
				iconPath: "./assets/images/shouye.png",
				selectedIconPath: "./assets/images/shouye-on.png",
				text: "首页"
			},
			{
				pagePath: "pages/estimate/index",
				iconPath: "./assets/images/zhangdan.png",
				selectedIconPath: "./assets/images/zhangdan-on.png",
				text: "收费标准"
			},
			{
				pagePath: "pages/mine/index",
				iconPath: "./assets/images/wode.png",
				selectedIconPath: "./assets/images/wode-on.png",
				text: "我的"
			}
		]
	},
	window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#fff',
		navigationBarTitleText: 'WeChat',
		navigationBarTextStyle: 'black'
	}
})
