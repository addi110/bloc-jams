var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

var albumCokeStudio = {
    title: 'Coke Studio',
    artist: 'Season 9',
    label: 'RBT',
    year: '2016',
    albumArtUrl: 'assets/images/album_covers/22.jpg',
    songs: [
        { title: 'Aye Rah-e-Haq ke Shaheedo', duration: '3:03' },
        { title: 'Aaqa', duration: '8:27' },
        { title: 'Aja Re Moray Saiyaan', duration: '6:11' },
        { title: 'Janay Na Tu', duration: '6:40' },
        { title: 'Maula-e-Kull', duration: '9:52' }
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
      ' <tr class="album-view-song-item">'
    + '   <td class="song-item-number">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName+ '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + ' </tr>'
    ;

return template;

};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var songListTable = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function (album) {
    albumTitle.innerText = album.title;
    albumArtist.innerText = album.artist;
    albumReleaseInfo.innerText = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    songListTable.innerHTML = '';

    for (var i = 0; i < album.songs.length; i++) {
        songListTable.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};



window.onload = function () {
    setCurrentAlbum(albumPicasso);

    var albums = [ albumPicasso, albumMarconi, albumCokeStudio ];
    var index = 0;

    albumImage.addEventListener('click', function (event) {
    setCurrentAlbum(albums[index]);
    index++;
    if ( index == albums.length) {
        index = 0;
       }
    });
};
