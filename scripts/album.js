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

var createSongRow = function (songNumber, songName, songLength) {
    var template =
      ' <tr class="album-view-song-item">'
    + '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName+ '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + ' </tr>'
    ;

    var $row = $(template);

    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong === null) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songNumber) {
            var currentlyPlayingSongElement = $('.song-item-number[data-song-number = "' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        }
    };

    var onHover = function (event) {
        var songItem = $(this).find('.song-item-number');
        var songItemNumber = songItem.attr('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
            songItem.html(playButtonTemplate);
        }

    };

    var offHover = function (event) {
        var songItem = $(this).find('.song-item-number');
        var songItemNumber = songItem.attr('data-song-number');

        if (songItemNumber !== currentlyPlayingSong) {
            songItem.html(songItemNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function (album) {
    // var albumTitle = document.getElementsByClassName('album-view-title')[0];
    // var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    // var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    // var albumImage = document.getElementsByClassName('album-cover-art')[0];
    // var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    // albumTitle.innerText = album.title;
    // albumArtist.innerText = album.artist;
    // albumReleaseInfo.innerText = album.year + ' ' + album.label;
    // albumImage.setAttribute('src', album.albumArtUrl);
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    //songListContainer.innerHTML = '';
    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        //songListContainer.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration );
        $albumSongList.append($newRow);
    }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});
