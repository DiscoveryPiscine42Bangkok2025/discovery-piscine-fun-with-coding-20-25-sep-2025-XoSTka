(function ($) {

    function getTodosFromCookie() {
        var cookies = document.cookie.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var pair = cookies[i].split('=');
            if (pair[0] === 'todos') {
                try { return JSON.parse(decodeURIComponent(pair[1])) || []; }
                catch (e) { return []; }
            }
        }
        return [];
    }

    function saveTodosToCookie() {
        var todos = $('#ft_list').children().map(function () {
            return $(this).text();
        }).get();
        document.cookie = 'todos=' + encodeURIComponent(JSON.stringify(todos)) + '; path=/';
    }

    function addTodo(text) {
        var $item = $('<div>').text(text);

        $item.on('click', function () {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveTodosToCookie();
            }
        });

        $('#ft_list').prepend($item);
    }


    $(function () {

        var existing = getTodosFromCookie();

        for (var i = existing.length - 1; i >= 0; i--) {
            addTodo(existing[i]);
        }


        $('#new').on('click', function () {
            var task = prompt('Enter your new TO DO:');
            if (task && task.trim() !== '') {
                addTodo(task.trim());
                saveTodosToCookie();
            }
        });
    });

})(jQuery);
