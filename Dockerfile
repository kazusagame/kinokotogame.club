FROM node:25.6-slim

# パッケージのインストールとクリーンアップ
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        git \
        locales \
        sudo \
        tzdata \
        vim \
        ca-certificates \
        && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
    apt-get clean && \
    rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# 環境変数の定義
ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    TZ=Asia/Tokyo

# アプリ用の非rootユーザの登録
ARG USERNAME=appuser
ARG PASSWORD=appuser
ARG GROUPNAME=appuser
ARG UID=5001
ARG GID=5001

RUN groupadd --g ${GID} ${GROUPNAME} && \
    useradd -u ${UID} -g ${GID} -G sudo -m -s /bin/bash ${USERNAME} && \
    echo ${USERNAME}:${PASSWORD} | chpasswd && \
    echo "%${USERNAME} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 開発作業用ディレクトリに移動して所有者を変更
WORKDIR /workspaces
RUN chown -R ${USERNAME}:${GROUPNAME} /workspaces

# ユーザの切替
USER ${USERNAME}

# 公開ポートの設定
EXPOSE 3000

CMD ["/bin/bash"]
