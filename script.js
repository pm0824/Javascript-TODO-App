var todos={
    todoList : [],
    addTodo : function(todoString){
        this.todoList.push({
            todoString:todoString,
            completed:false
        });
        
    },
    changeTodo : function(index,todoString){
        this.todoList[index].todoString=todoString;
        
    },
    deleteTodo : function(index){
        this.todoList.splice(index,1);
        
    },
    toggleCompleted : function(index){
        var todo = this.todoList[index];
        todo.completed = !todo.completed;
       
    },
    toggleAll : function(){
        var totalTodos = this.todoList.length;
        var completedTodos = 0;

        //Count completed todos
        this.todoList.forEach(function(todo){
            if(todo.completed===true){
                completedTodos++;
            }
        });

        //If all completed toggle all to not completed
        this.todoList.forEach(function(todo){
            if(totalTodos===completedTodos){
                todo.completed=false;
            }
            else{
                todo.completed=true;
            }
        });
      
    }
}

var handlers = {
    displayTodo: function(){
      
        view.displayTodos();
    },
    changeTodo : function(index,todoString){
       todos.changeTodo(index,todoString);
        view.displayTodos();
    },
    deleteTodo : function(index){
        todos.deleteTodo(index);
        view.displayTodos();
    },
    toggleAll : function(){
        todos.toggleAll();
        view.displayTodos();
    },
    toggleCompleted : function(index){
        todos.toggleCompleted(index);
        view.displayTodos();
    },
    submitTodo: function(){
        event.preventDefault();
        var todoInput = document.getElementById('todoInput');
       
        todos.addTodo(todoInput.value);
        todoInput.value='';
       
        view.displayTodos();
    }
}

var view = {
    displayTodos: function(){
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML='';

        todos.todoList.forEach(function(todo,i){
            var todoLi = document.createElement('li');
            var todoText = document.createElement('span');
            todoText.className = 'todo-text';
            var todoCheck = document.createElement('input');
            todoCheck.type = 'checkbox';
            todoCheck.className='todo-check';
            todoLi.appendChild(todoCheck);
            todoLi.appendChild(todoText);
            
            var todoStringWithCompletion='';

            if(todo.completed===true){
                todoStringWithCompletion = todo.todoString;
                todoCheck.checked=true;
            }
            else{
                todoStringWithCompletion = todo.todoString;
                todoCheck.checked=false;
            }
            todoLi.id=i;
            todoText.textContent = todoStringWithCompletion;
            todoLi.appendChild(this.createEditButton());
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        },this);
    },

    createDeleteButton : function(){
        var delBtn = document.createElement('button');
        var delIcon = document.createElement('i');
        delIcon.className = 'fa fa-trash';
        delBtn.className = 'delbtn';
        delBtn.appendChild(delIcon);
        return delBtn;
    },
    
    createEditButton : function(){
        var editBtn = document.createElement('button');
        editBtn.textContent='Change';
        editBtn.className = 'editbtn';
        return editBtn;
    },

    setUpEventListeners: function(){
        var todosUl = document.querySelector('ul');
        
        todosUl.addEventListener('click',function(event){
        
        //Get the clicked element
        var clickedElement = event.target;
        console.log(event.target);
        //If it is delete btn
        if(clickedElement.className==='delbtn' || clickedElement.className==='fa fa-trash'){
            handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
        }

        if(clickedElement.className==='todo-text'){
            console.log(clickedElement);
            clickedElement.contentEditable = true;
            clickedElement.className+=' todo-text-editing';
        }

        if(clickedElement.className==='editbtn'){
            console.log(clickedElement);
            console.log(clickedElement.parentNode.id);
            handlers.changeTodo(parseInt(clickedElement.parentNode.id),
                                document.getElementsByClassName('todo-text')[clickedElement.parentNode.id].textContent);
        }
        
        if(clickedElement.className==='todo-check'){
            console.log(clickedElement);
            handlers.toggleCompleted(parseInt(clickedElement.parentNode.id));
        }
       
        });
    }
};

view.setUpEventListeners();

