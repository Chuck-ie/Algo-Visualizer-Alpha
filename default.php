<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="keywords" content="Visualizer, Coding, Algorithms">
        <meta name="description" content="Visualizer of various algorithms. Includes sorting- and pathfinding algorithms">
        <meta name="author" content="Tom Carnein">
        <meta name="viewport" content="width=device-width, inition-scale=1, height=device-height">
        
        <title>Visualizer</title>
        <!-- <link rel="stylesheet" type="text/css" href="/css/style.css"> -->
        <!-- <link rel="stylesheet" type="text/css" href="/css/my_style.css"> -->
        <!-- <link rel="stylesheet" type="text/css" href="../css/my_style.css"> -->
        <link rel="stylesheet" type="text/css" href="/public/css/my_style.css">


    </head>
    <body>

        <div id="my_sidebar">
            <header>
                <p>Tom Carnein</p>
            </header>
            <a class="menu_option">Homepage</a><br>
            <a class="menu_option">My Projects</a><br>
            <a class="menu_option">Explore</a><br>
            <a class="menu_option">About</a><br>
            <a class="menu_option">Contact</a><br>
        </div>
        
        <div id="playfield">
            
            <div id="playfield_menu">
                <!-- ############################################################################ -->
                <h1 style="margin:7px;padding-bottom:5px;">Algorithm Menu</h1>
                <!-- ############################################################################ -->
                <div class="my_dropdown_menu" onclick="showDropdown(my_menu1_header, my_menu1)">
                    <p id="my_menu1_header" style="border-top:1px solid black;">
                        Algorithm Type
                        <i class="fas fa-angle-left"></i>
                    </p>
                    <div class="my_dropdown_options" id="my_menu1" contenteditable="false">
                        <p onclick="selectAlgoType(my_menu1_header, this, my_standard, my_pathing, my_sorting)">Pathfinding</p>
                        <p onclick="selectAlgoType(my_menu1_header, this, my_standard, my_pathing, my_sorting)">Sorting</p>
                    </div>
                </div>
                <!-- ############################################################################ -->
                <div id="my_standard" class="my_dropdown_menu" onclick="showDropdown(my_menu2_header, my_menu2)">
                    <p id="my_menu2_header">
                        Choose Algorithm
                        <i class="fas fa-angle-left"></i>
                    </p>
                    <div class="my_dropdown_options" id="my_menu2" contenteditable="false">
                        <p>Select Algotype first</p>
                    </div>
                </div>
                <!-- ############################################################################ -->
                <div id="my_pathing" class="my_dropdown_menu" onclick="showDropdown(my_menu3_header, my_menu3)">
                    <p id="my_menu3_header">
                        Choose Algorithm
                        <i class="fas fa-angle-left"></i>
                    </p>
                    <div class="my_dropdown_options" id="my_menu3" contenteditable="false">
                        <p onclick="selectAlgo(my_menu3_header, this)">Dijkstra</p>
                    </div>
                </div>
                <!-- ############################################################################ -->
                <div id="my_sorting" class="my_dropdown_menu" onclick="showDropdown(my_menu4_header, my_menu4)">
                    <p id="my_menu4_header">
                        Choose Algorithm
                        <i class="fas fa-angle-left"></i>
                    </p>
                    <div class="my_dropdown_options" id="my_menu4" contenteditable="false">
                        <p onclick="selectAlgo(my_menu4_header, this)">Selection Sort</p>
                        <p onclick="selectAlgo(my_menu4_header, this)">Quick Sort</p>
                    </div>
                </div>
                <!-- ############################################################################ -->
                <div class="my_dropdown_menu" onclick="showDropdown(my_menu5_header, my_menu5)">
                    <p id="my_menu5_header">
                        Choose Speed
                        <i class="fas fa-angle-left"></i>
                    </p>
                    <div class="my_dropdown_options" id="my_menu5" contenteditable="false">
                        <p id="0.25" onclick="selectAlgoSpeed(my_menu5_header, my_menu5, this)">0.25x</p>
                        <p id="0.5" onclick="selectAlgoSpeed(my_menu5_header, my_menu5, this)">0.50x</p>
                        <p id="0.75" onclick="selectAlgoSpeed(my_menu5_header, my_menu5, this)">0.75x</p>
                        <p id="1.0" onclick="selectAlgoSpeed(my_menu5_header, my_menu5, this)">1.00x</p>
                    </div>
                </div>
                <!-- ############################################################################ -->
                <div id="my_reset" class="my_start_reset" onclick="resetPlayfield(this)">
                    <p>Reset Playfield</p>
                </div>
                <!-- ############################################################################ -->
                <div id="my_start" class="my_start_reset" onclick="testStart(this)">
                    <p>Start Algorithm</p>
                </div>
                <!-- ############################################################################ -->

                

            </div>
            
            <div id="playfield_container"></div>
            
        </div>

        <!-- all scripts -->
        <!-- <script src="../js_files/playfieldMenu.js"></script>
        <script src="../js_files/playfieldMain.js"></script>

        <script src="../js_files/AlgosPathing.js"></script>
        <script src="../js_files/AlgosSorting.js"></script>

        <script src="../js_files/HelpFunctions.js"></script>
        <script src="../js_files/HelpFunctionsPath.js"></script>
        <script src="../js_files/HelpFunctionsSort.js"></script> -->

        <script src="/public/js_files/playfieldMenu.js"></script>
        <script src="/public/js_files/playfieldMain.js"></script>

        <script src="/public/js_files/AlgosPathing.js"></script>
        <script src="/public/js_files/AlgosSorting.js"></script>

        <script src="/public/js_files/HelpFunctions.js"></script>
        <script src="/public/js_files/HelpFunctionsPath.js"></script>
        <script src="/public/js_files/HelpFunctionsSort.js"></script>

        <script src="https://kit.fontawesome.com/01a92479e6.js" crossorigin="anonymous"></script>

    </body>

</html>