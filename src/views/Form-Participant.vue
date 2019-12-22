<template>
    <div class="wrapper">
        <div class="sidebar">
            <div class="brand">
                <img src="../assets/Logo.svg" alt="image-logo" class="logo-text">
            </div>
            <ul>
                <li><a href="#"><i class="fas fa-columns"></i>Dashboard</a></li>
                <li class="active"><a href="#"><i class="fas fa-user"></i>Participant</a></li>
                <li><a href="#"><i class="fas fa-calendar"></i>Schedule</a></li>
                <li><a href="#"><i class="fas fa-graduation-cap"></i>Participants Pass</a></li>
            </ul>

        </div>
        <div class="main_content">
            <div class="container">
                <div class="semua">
                    <div class="header-table">
                        <div class="title">
                            <h2>Add Participant</h2>
                        </div>
                    </div>
                    <!-- Form Add Participant -->
                    <div class="input-form">
                    <form action="" method="post">
                        <div class="input-label">
                        <label for="">Insert Name</label>
                        <input placeholder="Full Name" type="text" name="name" id="">
                    </div>
                    <div class="input-label">
                        <label for="">Phone Number</label>
                        <input placeholder="eg: 082136526372" type="text" name="telephone" id="">
                    </div>
                    <div class="input-label">
                        <label for="">Username</label>
                        <input placeholder="eg: badawi1713" type="text" name="username" id="">
                    </div>
                    <div class="input-label">
                        <label for="">Address</label>
                        <input placeholder="Valid Address" type="text" name="address" id="">
                    </div>
                    <div class="button-class">
                        <button class="cancel">Cancel</button>
                        <button class="submit">Save</button>
                    </div>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
}

.wrapper {
    display: flex;
    position: relative;
background-color: #edf1f8;
}

.wrapper .sidebar {
    width: 260px;
    height: 100%;
    background-color: white;
    padding: 30px 0px;
    position: fixed;
}

.wrapper .sidebar .brand {
    color: #d4d3cf;
    display: block;
    margin-left: 1.2em;
    margin-right: 0.9em;
    margin-bottom: 4em;
}

.wrapper .sidebar img {
    height: 30px;
}

.wrapper .sidebar ul li {
    padding: 20px;
}

.wrapper .sidebar ul li.active a {
    color: crimson
}

.wrapper .sidebar ul li a {
    color: #01111c;
    display: block;
}

.wrapper .sidebar ul li a .fas {
    width: 25px;
}

.wrapper .sidebar ul li:hover {
    background-color: crimson;

}

.wrapper .sidebar ul li.active:hover a {
    color: white;
}

.wrapper .sidebar ul li:hover a {
    color: white;
}

.wrapper .main_content {
    width: 100%;
    margin-left: 260px;
}

.wrapper .main_content .container {
    color: #01111c;
    line-height: 25px;
    margin: 60px;
}

.wrapper .main_content .container div {
    margin-bottom: 20px;
}

/* Table Style */
.container .semua {
    background-color: white;
    border-radius: 7px;
    position: relative;
    padding-bottom: 30px;
}

.container .semua .header-table {
    background-color: #ebecec;
    height: 80px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

.container .title {
    float: left;
    height: inherit;
    padding: 21px;
}

.container .title h2 {
    margin: 9px;
    color: #01111c;
}



/* FORM ADD PARTICIPANT */
.input-form {
    width: 100%;
    left: 0;
    box-sizing: border-box;
    margin: 40px 0;
    padding-left: 90px;
}

.input-form form .input-label {
    padding-bottom: 5px;
}

.input-form form label {
    font-weight: bold;
}

.input-form form input {
    width: 60%;
    padding: 12px 20px;
    margin: 8px 0;
    display:flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.button-class button {
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 5px;
}

button.cancel {
    background-color: #df205b;
    cursor: pointer;
    color: white;
    font-size: 16px;
    display: inline-flexbox;
}

button.cancel:hover {
 background-color: #c02355;
}

button.submit:hover {
    background-color: #2a8660;
   }

button.submit {
    margin-left: 20px;
    background-color: #32b67f;
    cursor: pointer;
    color: white;
    font-size: 16px;
}
</style>