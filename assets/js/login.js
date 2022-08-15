$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    let layer = layui.layer

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                    // return console.log(res.message);
                }
                layer.msg('注册成功！');
                $('#link_login').click()
                    // console.log('注册成功！');
            }
        )
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    console.log(111);
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                location.href = '../素材/index.html'
            }
        })
    })
})