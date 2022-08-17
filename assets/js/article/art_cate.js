$(function() {
    initArtCateList()
    let layer = layui.layer
    let form = layui.form

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                let htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    let indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '240px'],
            content: $('#tpl_add').html()
        });
    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#form-add').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    console.log($('#form-add').serialize());
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {

        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '240px'],
            content: $('#tpl_edit').html()
        });

        let Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg('更新分类失败！')
                }
                initArtCateList()
                layer.msg('更新分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexEdit)
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id')
            //eg1
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })

})