var collectionTemplate =
  '<div class="collection-album-container column fourth">'
+ '  <img src="assets/images/album_covers/01.png"/>'
+ '  <div class="collection-album-info caption">'
+ '    <p>'
+ '      <a class="album-name" href="album.html">The Colors</a>'
+ '      <br/>'
+ '      <a href="album.html">Pablo Picasso</a>'
+ '      <br/>'
+ '      X Songs'
+ '      <br/>'
+ '    </p>'
+ '  </div>'
+ '</div>'
;

window.onload = function () {

var albumContainer = document.getElementsByClassName('album-covers')[0];

    albumContainer.innerHTML = '';

    for (var i =0; i < 12; i++) {
        albumContainer.innerHTML += collectionTemplate;
      }
};