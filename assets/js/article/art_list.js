$(function() {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                let htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败!')
                }
                // layer.msg('获取分类数据成功!')
                let htmlStr = template('tpl_cate', res)
                    // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                console.log(first);
                if (!first) {
                    initTable()
                }
            }
        })
    }

})