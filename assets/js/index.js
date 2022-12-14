$(function() {
    getUserInfo()
})
$('#btnLogout').on('click', function() {
    let layer = layui.layer
    layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
        //do something
        console.log(index);
        if (index) {
            localStorage.setItem('token', '')
            location.href = '../素材/login.html'
        }
        layer.close(index);
    });

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        let fWord = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(fWord).show()
    }
}