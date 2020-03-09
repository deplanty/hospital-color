# La couleur des hôpitaux

Un petit projet pour affecter une couleur aux hôpitaux de l'AP-HP.
Ils se définissent avec un trigramme, par exemple celui de l'hôpital Henri Mondor est `HMN`.

## Du trigramme à la couleur

Une couleur est définie par une certaine quantité de rouge, de vert et de bleu (RVB).
Ces quantités allant de 0 à 255 (pour 256 couleurs possibles).
Au total, il y a 256&times;256&times;256 = plus de 16 millions de couleurs.

Comme un tigramme est composé de 3 lettres, on peut donc associer une lettre par couleur.
La lettre A représent le 0 et la lettre Z le 255.
Ainsi, `HMN` est en RVB : 71, 122 et 133 ![.](https://placehold.it/15/477a85/000000?text=+).

## Calculateur

L'idée du projet est donc d'obtenir automatiquement la couleur correspondant aux trigrammes.
Ce calculateur est accessible à l'adresse suivante : https://deplanty.github.io/hospital-color/
