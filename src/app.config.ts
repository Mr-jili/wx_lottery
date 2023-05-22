export default defineAppConfig({
	pages: [
		'pages/login/index',
		'pages/home/index',
		'pages/center/index'
	],
	tabBar: {
		color: "#666",
		selectedColor: "#b4282d",
		backgroundColor: "#fafafa",
		borderStyle: 'black',
		list: [
			{
				pagePath: "pages/home/index",
				iconPath: "./assets/images/home.png",
				selectedIconPath: "./assets/images/home.png",
				text: "首页"
			},
			{
				pagePath: "pages/center/index",
				iconPath: "./assets/images/home.png",
				selectedIconPath: "./assets/images/home.png",
				text: "个人"
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
