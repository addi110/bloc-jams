var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number = "' + number + '"]');
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
      ' <tr class="album-view-song-item">'
    + '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title" data-song-name="' + songName + '">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + ' </tr>'
    ;

    var $row = $(template);

    // var clickHandler = function() {
    //     var songNumber = $(this).attr('data-song-number');
    //     var songName = $(this).attr('data-song-name');
    //
    //     if (currentlyPlayingSongNumber === null) {
    //         $(this).html(pauseButtonTemplate);
    //         currentlyPlayingSongNumber = songNumber;
    //         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    //     } else if (currentlyPlayingSongNumber === songNumber) {
    //         $(this).html(playButtonTemplate);
    //         currentlyPlayingSongNumber = null;
    //         currentSongFromAlbum = null;
    //     } else if (currentlyPlayingSongNumber !== songNumber) {
    //         var currentlyPlayingSongElement = $('.song-item-number[data-song-number = "' + currentlyPlayingSongNumber + '"]');
    //         currentlyPlayingSongElement.html(currentlyPlayingSongElement.attr('data-song-number'));
    //         $(this).html(pauseButtonTemplate);
    //         currentlyPlayingSongNumber = songNumber;
    //         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    //     }
    // };

    var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
          currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if (currentlyPlayingSongNumber !== songNumber) {
          $(this).html(pauseButtonTemplate);
          setSong(songNumber);
          updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
          $(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
          currentlyPlayingSongNumber = null;
          currentSongFromAlbum = null;
        }

    };

    // var onHover = function (event) {
    //     var songItem = $(this).find('.song-item-number');
    //     var songItemNumber = songItem.attr('data-song-number');
    //
    //     if (songItemNumber !== currentlyPlayingSongNumber) {
    //         songItem.html(playButtonTemplate);
    //     }
    //
    // };
    //
    // var offHover = function (event) {
    //     var songItem = $(this).find('.song-item-number');
    //     var songItemNumber = songItem.attr('data-song-number');
    //
    //     if (songItemNumber !== currentlyPlayingSongNumber) {
    //         songItem.html(songItemNumber);
    //     }
    // };


    var onHover = function() {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var getSongNumberCell = function(number) {

    }
    var offHover = function() {
        var songNumberCell = parseInt($(this).find('.song-item-number'));
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);

        console.log("songNumber type is" + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
        }
    };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setCurrentAlbum = function (album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    //songListContainer.innerHTML = '';
    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
        //songListContainer.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    var $songName = $('.currently-playing .song-name');
    var $artistName = $('.currently-playing .artist-name');
    var $artistSongMobile = $('.currently-playing .artist-song-mobile');

    $songName.text(currentSongFromAlbum.title);
    $artistName.text(currentAlbum.artist);
    $artistSongMobile.text(currentSongFromAlbum.title + ' - ' + currentAlbum.artist);

    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
