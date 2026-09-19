'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');
const moodButtons = document.querySelectorAll('.mood-btn');

// 気分の初期値
let selectedMood = 'fun';

// 気分ボタンのクリック切り替え
moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    moodButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    selectedMood = button.getAttribute('data-mood');
  });
});

assessmentButton.addEventListener(
  'click',
  () => { // アロー関数
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリアの初期化
    resultDivision.innerText = '';

    // 結果データの取得
    const songData = assessment(userName, selectedMood);

    // 全体ラッパーの作成
    const wrapperDivision = document.createElement('div');
    wrapperDivision.setAttribute('class', 'result-wrapper');

    // 左側のテキストカード
    const cardDivision = document.createElement('div');
    cardDivision.setAttribute('class', 'result-card');

    // 曲名タグの作成
    const songTitleTag = document.createElement('div');
    songTitleTag.setAttribute('class', 'song-title-tag');
    songTitleTag.innerText = `♪♪　  ${songData.title}  　♪♪`;

    // メッセージ枠の作成
    const messageBox = document.createElement('div');
    messageBox.setAttribute('class', 'result-text-box');
    messageBox.innerText = `${userName} さんにオススメの曲は『${songData.title}』ダヨ~~★\n良かったら、聴いてみてネ ^_~`;

    cardDivision.appendChild(songTitleTag);
    cardDivision.appendChild(messageBox);

// 右側のアルバム画像/URL埋め込み枠の作成
    const albumDivision = document.createElement('div');
    albumDivision.setAttribute('class', 'album-card');
    
    if (songData.embed) {
      // 埋め込みコードがある場合は iframe をセット
      albumDivision.innerHTML = songData.embed;
    } else if (songData.image) {
      // 画像 URL がある場合は画像を表示
      const albumImage = document.createElement('img');
      albumImage.setAttribute('src', songData.image);
      albumImage.setAttribute('alt', songData.title);
      albumDivision.appendChild(albumImage);
    } else {
      // 何もない時の初期テキスト
      albumDivision.innerText = 'アルバムの写真\nOR\nURL埋め込み';
    }

    // resultDivision に各要素を差し込む
    wrapperDivision.appendChild(cardDivision);
    wrapperDivision.appendChild(albumDivision);
    resultDivision.appendChild(wrapperDivision);

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('オススメの曲診断') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', `${userName}さんにオススメの曲は「${songData.title}」でした！`);
    anchor.innerText = 'Tweet #オススメの曲診断';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  event => {
    if (event.code === 'Enter' && !event.isComposing) {
      assessmentButton.click();
    }
  }
);

// 気分ごとの曲データリスト
    /*{ title: '',
        embed: ''
     },*/
const songList = {
  fun: [
    {
      title: 'ケセラセラ',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%82%B1%E3%82%BB%E3%83%A9%E3%82%BB%E3%83%A9/1681600496?i=1681600508"></iframe>'
    },
    { title: '青と夏',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E9%9D%92%E3%81%A8%E5%A4%8F/1408505088?i=1408505264"></iframe>'
    },
    { title: 'Mela!',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/mela/1538137544?i=1538137547"></iframe>'
    },
    { title: 'ロコ・モーション', 
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%AD%E3%82%B3-%E3%83%A2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3/724792252?i=724793638"></iframe>'
    }
  ],
  dance: [
    { title: '踊ろうぜ', 
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E8%B8%8A%E3%82%8D%E3%81%86%E3%81%9C/1648876058?i=1648876743"></iframe>'
    },
    { title: 'ダンスホール',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%80%E3%83%B3%E3%82%B9%E3%83%9B%E3%83%BC%E3%83%AB/1623304208?i=1623304209"></iframe>'
    },
    { title: 'AIZO',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/aizo/1860538546?i=1860538548"></iframe>'
    },
    { title: 'ドラえもん音頭',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%89%E3%83%A9%E3%81%88%E3%82%82%E3%82%93%E9%9F%B3%E9%A0%AD/1465221497?i=1465221755"></iframe>'
    },
    { title: '匂艶 THE NIGHT CLUB',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%8C%82%E8%89%B6-the-night-club/949262276?i=949262281"></iframe>'
    },
    { title: '踊り子', 
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E8%B8%8A%E3%82%8A%E5%AD%90/1537344740?i=1537344741"></iframe>'
    }
  ],
  cry: [
    { title: '手紙',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E6%89%8B%E7%B4%99/1451577721?i=1451577954"></iframe>'
    },
    { title: 'LADY',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/lady/1394013451?i=1394013621"></iframe>'
    },
    { title: '奏',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%A5%8F-%E3%81%8B%E3%81%AA%E3%81%A7/1445037953?i=1445037956"></iframe>'
    },
    { title: '雨の慕情',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E9%9B%A8%E3%81%AE%E6%85%95%E6%83%85/1103121604?i=1103121606"></iframe>'
    }
  ],
  pain: [
    { title: '僕のこと',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%83%95%E3%81%AE%E3%81%93%E3%81%A8/1445145788?i=1445145789"></iframe>'
    },
    { title: '生きるをする',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E7%94%9F%E3%81%8D%E3%82%8B%E3%82%92%E3%81%99%E3%82%8B/1530511845?i=1530511846"></iframe>'
    },
    { title: 'ファイト！',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%88/1653993348?i=1653993350"></iframe>'
    },
    { title: 'プライド',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%97%E3%83%A9%E3%82%A4%E3%83%89/1437547956?i=1437548124"></iframe>'
    },
    { title: '蝋人形の館',
     embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E8%9D%8B%E4%BA%BA%E5%BD%A2%E3%81%AE%E9%A4%A8/1536773201?i=1536773207"></iframe>'
    }
  ],
    love: [
    { title: 'ロマンチシズム',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%AD%E3%83%9E%E3%83%B3%E3%83%81%E3%82%B7%E3%82%BA%E3%83%A0/1475232910?i=1475233722"></iframe>'
    },
    { title: 'OKKAKE',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/okkake/1436147707?i=1436147862"></iframe>'
    },
    { title: '幸せ',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%B9%B8%E3%81%9B/1451567916?i=1451567933"></iframe>'
    },
    { title: 'ビンテージ',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%83%93%E3%83%B3%E3%83%86%E3%83%BC%E3%82%B8/1479397582?i=1479397865"></iframe>'
    },
    { title: 'ずっとラブソング',
     embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%81%9A%E3%81%A3%E3%81%A8%E3%83%A9%E3%83%96%E3%82%BD%E3%83%B3%E3%82%B0/1833848240?i=1833848244"></iframe>'
    }
  ],
      money: [
    { title: 'Money, Money, Money',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/money-money-money/1422648512?i=1422648959"></iframe>'
    },
    { title: 'Money',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/money/1065973699?i=1065973708"></iframe>'
    },
    { title: 'Can't Buy Me Love',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%88-%E3%83%90%E3%82%A4-%E3%83%9F%E3%83%BC-%E3%83%A9%E3%83%B4-2009-remaster/1441164416?i=1441164423"></iframe>'
    },
    { title: '借金大王',
      embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%80%9F%E9%87%91%E5%A4%A7%E7%8E%8B/1442456229?i=1442456547"></iframe>'
    },
    { title: '年貢 for you feat. 旗本ひろし、足軽先生',
     embed: '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/%E5%B9%B4%E8%B2%A2-for-you-feat-%E6%97%97%E6%9C%AC%E3%81%B2%E3%82%8D%E3%81%97-%E8%B6%B3%E8%BB%BD%E5%85%88%E7%94%9F/879278591?i=879278599"></iframe>'
    }
  ]
};

/**
 * 名前の文字列と気分を渡すとおすすめ曲オブジェクトを返す関数
 * @param {string} userName ユーザの名前
 * @param {string} mood 気分カテゴリ
 * @return {object} 診断結果（曲情報）
 */
function assessment(userName, mood) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 選択された気分の曲リストを取得
  const targetSongs = songList[mood] || songList['fun'];

  // 文字のコード番号の合計を曲リストの数で割って添え字の数値を求める
  const index = sumOfCharCode % targetSongs.length;
  return targetSongs[index];
}
