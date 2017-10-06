// 重置html的font-size
function resetFontSize() {
	// 获取屏幕宽度
	let windowW = document.documentElement.clientWidth
	// 以iPhone5作为参考
	let scale = windowW / 320
	let newSize = 100 * scale
	document.getElementsByTagName('html')[0].style.fontSize = newSize + "px"
}
// 监听浏览器大小变化更新
window.addEventListener('resize', function () {
	resetFontSize()
}, false)
resetFontSize()