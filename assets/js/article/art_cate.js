$(function() {
    initArtCateList()
    let layer = layui.layer

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
                console.log('*****');
                console.log($('#form-add').serialize());
                console.log(res.message);

                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
})