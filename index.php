<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dames</title>
    <link rel="stylesheet" href="css.css" type="text/css" />
    <script type="text/javascript" src="main.js" defer></script>
</head>
<body>
    <!-- HTML -->
    <div id="score-blanc">Score Blanc: 0</div>
    <div id="score-noir">Score Noir: 0</div>


    <div id="plateau">
<?php
    for ($i=0; $i<10; $i++) {
        // Couleur de la case
        for ($j=0; $j<10; $j++) {
            //Pion ou non ?
            $pion = "";
            if ($i<4) {
                // Noir sur les 4 premières lignes (0 à 3)
                $pion = '<div class="pion pion_noir"></div>';
            }
            if ($i>5) {
                // Blanc sur les 4 dernières lignes (6 à 9)
                $pion = '<div class="pion pion_blanc"></div>';
            }
            
            $class = "case case_";
            
            if ($i%2===0) {
                // Ligne paire
                if ($j%2===0) {
                    //case claire
                    $class .= "claire";
                    
                    // pas de pion
                    $pion = "";
                } else {
                    $class .= "sombre";
                }
            } else {
                // Ligne paire, on inverse
                if ($j%2===1) {
                    //case claire
                    $class .= "claire";
                    
                    // pas de pion
                    $pion = "";
                } else {
                    $class .= "sombre";
                }
            }
?><div id="case_<?= $i ?>_<?= $j ?>" case_x="<?= $j ?>" case_y="<?= $i ?>" class="<?= $class ?>"><?= $pion ?></div><?php
        }
    }
?>
    </div>
</body>
</html>