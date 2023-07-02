### 開発手順
1. npm installで必要なライブラリをインストールする
2. npm startで開発を始める（http://localhost:3000/）
```
$ npm install
$ npm start
```

### turn serverメモ（参考:https://ja.tech.jar.jp/webrtc/turn.html）
```
$ sudo apt install coturn
$ sudo vim /etc/default/coturn
```
/etc/default/turn内のTURNSERVER_ENABLED=1のコメントアウトを削除
```
TURNSERVER_ENABLED=1
```
/etc/turnserver.confのファイルを編集
```
$ sudo vim /etc/turnserver.conf
```
以下のように。domainにはサーバーに割り当てたドメインを入力
```
# TURN のメッセージに fingerprint を使うための設定で，WebRTC では必須
fingerprint

# turn/stunを以下のportで受け取るように設定
listening-port=3478

# turn でrelayする際のport番号範囲の指定
min-port=49152
max-port=65535

# Long-term credential 機構を有効にします。こちらも WebRTC では必須
lt-cred-mech

# servernameとなるドメイン名を指定
server-name=domain

# REALM となるドメイン名を指定
realm=domain

# syslogにログを出力
syslog

# ログを詳しく出力
verbose

# STUN/TURN で使用する TLS 証明書と秘密鍵のパスを設定
cert=/etc/letsencrypt/live/domain/fullchain.pem
pkey=/etc/letsencrypt/live/domain/privkey.pem

# TLS で使う暗号スイートを設定
cipher-list="ここはシークレット"

# TLS の DH 鍵のビット長を 2066 
dh2066

# ログの出力先を設定
log-file=/var/log/turn.log

# 上述の log-file で指定したファイルにログの書き込み設定
simple-log

# TLS1.0, 1.1 を無効にします（TLS1.2, TLS1.3を使用します）
no-tlsv1
no-tlsv1_1
```

編集終わりに以下を実行
```
$ sudo systemctl restart coturn
```

turn serverの使用者とパスワードを追加

```
$ sudo turnadmin -a -u user -r domain -p password
```

webrtcの接続確認のサイト（https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/ ）
でstun:domain:3478とturn:domain:3478[user:password]を試験し、Doneが出たら成功?
以下のようにlogを見てsuccessが出ていればほぼ成功

```
$ cat /var/log/syslog | grep turnserver
```


