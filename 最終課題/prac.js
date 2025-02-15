"use strict";

const save_btn = document.getElementById('save_btn');
const textinput = document.getElementById('text');

save_btn.addEventListener('click', function () {
  // const textarea = document.getElementById('text');
  const text = textinput.value.trim();
  const length = text.length;
  if (text) {
    if (length < 50){
      const memos = JSON.parse(localStorage.getItem('memos')) || [];
      memos.push(text);
      localStorage.setItem('memos', JSON.stringify(memos));
      textinput.value = '';
      displayMemos();
    }else{
      window.alert('文字数がオーバーしています。')
    }
  } else {
    window.alert('文字を入力してください。');
  }
}) 

 // 文字数カウント
textinput.addEventListener('input', function(){
  const textlength = textinput.value.length;
  const count = document.getElementById('count');
  count.textContent = textlength;
  if (textlength > 50){
    // textinput.setAttribute('class', 'bg_textarea');
    textinput.classList.add('bg_textarea');
  }else{
    // textinput.removeAttribute('class');
    textinput.classList.remove('bg_textarea');
  }
})



function displayMemos() {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  const memo_list = document.getElementById('memo_list');
  memo_list.replaceChildren();
  memos.forEach(function (memo, index) {
    const li = document.createElement('li');
    li.textContent = memo;

    const h4 = document.createElement('h4');
    h4.textContent = '';
    li.appendChild(h4);

    const button = document.createElement('button');
    button.textContent = '削除';
    button.setAttribute('id', `del_btn_${index}`);
    button.classList.add('delete-btn');
    li.appendChild(button);

    button.addEventListener('click', function () {
      memos.splice(index, 1);
      localStorage.setItem('memos', JSON.stringify(memos));
      displayMemos();
    })
    memo_list.appendChild(li);

    const p = document.createElement('p');
    p.textContent = '---------------------------'
    li.appendChild(p);
  });
} 

displayMemos();

// すべて削除
const all_del = document.getElementById('all_del_btn');
all_del.addEventListener('click', function () {
  localStorage.clear();
  const memo_list = document.getElementById('memo_list');
  memo_list.replaceChildren()
});

// ダークモード      
const change_color = document.getElementById('change_color');
change_color.addEventListener('click', function(){
  document.body.classList.toggle('dark_mode')
});

// キーイベント
const textarea = document.getElementById('text');
textarea.addEventListener('keydown', function(event) {
  const count_moji = document.getElementById('count');
  const count_value = count_moji.textContent;
  if (event.key === 'Enter') {
    if (count_value > 50){
      window.alert('文字数がオーバーしています。');
    }else{
      event.preventDefault(); // デフォルトの動作を防ぐ
      save_btn.click(); // save_btnのクリックイベントを発生させる
      textinput.classList.remove('bg_textarea');
      const count = document.getElementById('count');
      count.textContent = '';
    }
  }
});
