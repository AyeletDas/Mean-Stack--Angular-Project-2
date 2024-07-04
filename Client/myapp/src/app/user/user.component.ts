import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Task {
  _id: string;
  Title: string;
  Completed: boolean;
}

interface Post {
  _id: string;
  Title: string;
  Body: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';

  selectedUser: any = {
    _id: '',
    name: '',
    email: '',
    street: '',
    city: '',
    Zipcode: '',
    Tasks: [
      { Title: '', Completed: false }
    ],
    Posts: [
      { Title: '', Body: '' }
    ]
  };

  newUser: any = {
    name: '',
    email: '',
    street: '',
    city: '',
    Zipcode: ''
  };

  selectedUserId: string = '';
  isOtherDataVisible: boolean = false;
  isDetailsVisible: boolean = false;

  isAddingUser: boolean = false;
  isAddingTask: boolean = false;
  newTaskTitle: string = '';
  newTaskCompleted: boolean = false;

  isAddingPost: boolean = false;
  newPostTitle: string = '';
  newPostBody: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit():void {
    this.getAllUsers(); // לטעון משתמשים או פעולות נוספות בעת טעינת הקומפוננטה

  }

  getAllUsers() {
    this.http.get<any[]>('http://localhost:7000/user').subscribe(data => {
      console.log(data);
      this.users = data;
      this.filteredUsers = data;
    });
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
    this.selectedUserId = user._id;
  }

  toggleOtherData(user: any) {
    this.isOtherDataVisible = !this.isOtherDataVisible;
  }

  showPostAndTasks(user: any) {
    if (this.selectedUser._id === user._id) {
      this.isDetailsVisible = !this.isDetailsVisible;
    } else {
      this.selectedUser = { ...user };
      this.isDetailsVisible = true;
    }
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchText = input.value.toLowerCase();
    this.filteredUsers = this.users.filter(
      user =>
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
    );
  }

  addTask() {
    this.isAddingTask = true;
  }

  saveTask() {
    const task = {
      Title: this.newTaskTitle,
      Completed: Boolean(this.newTaskCompleted) // ממיר לבוליאני
    };

    this.http
      .post(`http://localhost:7000/user/${this.selectedUser._id}/tasks`, task)
      .subscribe(
        response => {
          this.selectedUser.Tasks.push(task);
          this.clearNewTask();
          this.isAddingTask = false;
          alert('המשימה נשמרה בהצלחה!');
        },
        error => {
          console.error('Error saving task:', error);
        }
      );
  }

  cancelAddTask() {
    this.clearNewTask();
    this.isAddingTask = false;
  }

  addPost() {
    this.isAddingPost = true;
  }

  savePost() {
    const post = {
      Title: this.newPostTitle,
      Body: this.newPostBody
    };

    this.http
      .post(`http://localhost:7000/user/${this.selectedUser._id}/posts`, post)
      .subscribe(
        response => {
          this.selectedUser.Posts.push(post);
          this.clearNewPost();
          this.isAddingPost = false;
          alert('הפוסט נשמר בהצלחה!');
        },
        error => {
          console.error('Error saving post:', error);
        }
      );
  }

  cancelAddPost() {
    this.clearNewPost();
    this.isAddingPost = false;
  }

  clearNewTask() {
    this.newTaskTitle = '';
    this.newTaskCompleted = false;
  }

  clearNewPost() {
    this.newPostTitle = '';
    this.newPostBody = '';
  }

  closeRightSide() {
    this.isDetailsVisible = false;
    this.router.navigate(['/']);
  }

  deleteTask(taskId: string) {
    // מחיקת המשימה מתוך selectedUser.Tasks
    this.selectedUser.Tasks = this.selectedUser.Tasks.filter(
      (task: Task) => task._id !== taskId
    );

    // שליחת בקשת HTTP DELETE לשרת
    this.http
      .delete(`http://localhost:7000/user/${this.selectedUser._id}/tasks/${taskId}`)
      .subscribe(
        () => {
          console.log('Task deleted successfully');
          alert('Task deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting task:', error);
        }
      );
  }

  deletePost(postId: string) {
    // מחיקת הפוסט מתוך selectedUser.Posts
    this.selectedUser.Posts = this.selectedUser.Posts.filter(
      (post: Post) => post._id !== postId
    );

    // שליחת בקשת HTTP DELETE לשרת
    this.http
      .delete(`http://localhost:7000/user/${this.selectedUser._id}/posts/${postId}`)
      .subscribe(
        () => {
          console.log('Post deleted successfully');
          alert('Post deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting post:', error);
        }
      );
  }
  
  updateUser(user: any) {
    console.log('Updating user:', user); // הצגת הנתונים לפני העדכון

    this.http.put(`http://localhost:7000/user/${user._id}`, user)
      .subscribe((response: any) => {
        console.log('User updated successfully:', response); // הצגת הנתונים המעודכנים מהשרת
        this.selectedUser = response; // עדכון המשתמש המקומי עם הנתונים החדשים
        alert('User updated successfully');
      }, error => {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      });
}



  deleteUser() {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http
        .delete(`http://localhost:7000/user/${this.selectedUser._id}`)
        .subscribe(
          () => {
            alert('User deleted successfully');
            // רענון הרשימה של המשתמשים להצגה בממשק
            this.getAllUsers();
          },
          (error: any) => {
            console.error('Error deleting user:', error);
          }
        );
    }
  }

  toggleAddUser() {
    this.isAddingUser = !this.isAddingUser;
  }

  saveNewUser() {
    this.http
      .post('http://localhost:7000/user', this.newUser)
      .subscribe(
        response => {
          this.users.push(response); // הוספת המשתמש החדש לרשימה הקיימת
          this.filteredUsers.push(response); // הוספת המשתמש החדש לרשימת המסננים

          // רענון הרשימה של המשתמשים להצגה בממשק
          this.getAllUsers();

          this.newUser = {
            name: '',
            email: '',
            street: '',
            city: '',
            Zipcode: ''
          };
          this.isAddingUser = false;
          alert('משתמש חדש נוסף בהצלחה!');
        },
        error => {
          console.error('Error saving new user:', error);
        }
      );
  }
}
