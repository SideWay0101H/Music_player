const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player")
const cd = $(".cd")
const heading = $("header h2")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const playBtn = $(".btn-toggle-play")
const progress = $("#progress")
const prevBtn = $(".btn-prev")
const nextBtn = $(".btn-next")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const playlist = $(".playlist")

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Chúng ta của hiện tại",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/chung_ta_cua_hien_tai.mp3",
            image: "./assets/images/chung_ta_cua_hien_tai.jpg",
        },
        {
            name: "Mây lang lang",
            singer: "Tùng Tea x PC",
            path: "./assets/music/may_lang_thang.mp3",
            image: "./assets/images/may_lang_thang.jpg",
        },
        {
            name:"Bạn đời",
            singer:"Karik x GDucky",
            path:"./assets/music/ban_doi.mp3",
            image:"./assets/images/ban_doi.jpg",
        },
        {
            name:"Thằng Điên",
            singer:"Justatee x  Phương Ly",
            path:"./assets/music/thang-dien.mp3",
            image:"./assets/images/thangdien.jpg",
        },
        {
            name:"Sống cho hết đời thanh xuân 4",
            singer:"Huỳnh Công Hiếu",
            path:"./assets/music/song-cho-het-doi-thanh-xuan-4.mp3",
            image:"./assets/images/SCHDTX4.jpg",
        },
        {
            name:"Những lời hứa bỏ quên",
            singer:"Vũ ",
            path:"./assets/music/nhung_loi_hua_bo_quen.mp3",
            image:"./assets/images/nhung_loi_hua_bo_quen.jpg",
        },
        {
            name: "Rolling down",
            singer: "CAPTAIN",
            path: "./assets/music/rolling-down.mp3",
            image: "./assets/images/rolling_down.jpg",
        },
        {
            name:"Anh đã quen với cô đơn",
            singer:"Soobin",
            path:"./assets/music/anh-da-quen-voi-co-don.mp3",
            image:"./assets/images/anh_da_quen_voi_co_don.jpg",
        },
        {
            name:"Ngày mai người ta lấy chồng",
            singer:"Thành Đạt",
            path:"./assets/music/ngay-mai-nguoi-ta-lay-chong.mp3",
            image:"./assets/images/ngay_mai_nguoi_ta_lay_chong.jpg",
        },
        {
            name: 'Ghé qua',
            singer:"Dick & Tofu & PC",
            path:"./assets/music/ghe_qua.mp3",
            image:"./assets/images/ghe_qua.jpg"
        },
        {
            name: 'id_072019 | 3107',
            singer:"W/n ft 267",
            path:"./assets/music/id_072019_3107.mp3",
            image:"./assets/images/id_072019.jpg"
        },
        {
            name: 'Đi về nhà',
            singer:"Đen ft Justatee",
            path:"./assets/music/di_ve_nha.mp3",
            image:"./assets/images/di_ve_nha.jpg"
        },
        {
            name: 'Cắt đôi nỗi sầu',
            singer:"Tăng Duy Tân",
            path:"./assets/music/cat_doi_noi_sau.mp3",
            image:"./assets/images/cat_doi_noi_sau.jpg"
        },
        {
            name: 'Where U At',
            singer:"Andree Right Hand ft JC Hưng",
            path:"./assets/music/where_u_at.mp3",
            image:"./assets/images/where_u_at.jpg"
        },
        {
            name: 'Mơ hồ',
            singer:"Bùi Anh Tuấn",
            path:"./assets/music/mo_ho.mp3",
            image:"./assets/images/mo_ho.jpg"
        },
        {
            name:"Tháng tư là lời nói dối của em ",
            singer:"Hà Anh Tuấn",
            path:"./assets/music/thang_tu_la_loi_noi_doi_cua_em.mp3",
            image:"./assets/images/thang_tu_la_loi_noi_doi_cua_em.jpg",
        },
        {
            name:"Hoa nở không màu",
            singer:"Hoài Lâm",
            path:"./assets/music/hoa_no_khong_mau.mp3",
            image:"./assets/images/hoa_no_khong_mau.jpg",
        },
        {
            name:"Bước qua nhau",
            singer:"Vũ",
            path:"./assets/music/buoc_qua_nhau.mp3",
            image:"./assets/images/buoc_qua_nhau.jpg",
        },
        {
            name:"Anh là ai",
            singer:"Huỳnh Công Hiếu x DT Tập Rap",
            path:"./assets/music/anh_la_ai.mp3",
            image:"./assets/images/anh_la_ai.jpg",
        },
        {
            name:"Lối nhỏ",
            singer:"Đen ft Phương Anh Đào",
            path:"./assets/music/loi_nho.mp3",
            image:"./assets/images/loi_nho.jpg",
        },
        {
            name:"Nắm lấy tay anh",
            singer:"Tuấn Hưng",
            path:"./assets/music/nam_lay_tay_anh.mp3",
            image:"./assets/images/nam_lay_tay_anh.jpg",
        }
    ],
        setConfig: function(key, value) { 
            this.config[key] = value;
            localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
        },
    render: function(){
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}">
                <div class="thumb"
                style="
                background-image: url('${song.image}');
                ">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('\n')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function(){
        const _this = this
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        //Xử lý cd spin / pause 
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(300deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()



         //xử lý phóng to hoặc thu nhỏ  CD
        document.onscroll = function()
        {
           
            const scrollTop = window.screenTop || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        //xử lý khi click play
        playBtn.onclick = function (){
            if(_this.isPlaying){
                audio.pause()
            }else {
                audio.play()
            }

        }

        //khi song được play
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //khi song bị pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        //Khi tiến độ bài hất thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //Xử lý khi tua song
        progress.oninput = function(e){
         const seektime = audio.duration / 100 * e.target.value
         audio.currentTime = seektime
        }

        //khi next song
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollTopActiveSong()
        }
        //khi prev song 
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }
        //khi xử lý bật / tắt random song
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
        }

        //Xử lý lặp lại cho một song
        repeatBtn.onclick = function(e){
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }

        //Xử lý next song khi audio ended
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else {
                nextBtn.click()
            }
        }

        //lắng nghe hành vi click vào playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')

            if(songNode || e.target.closest('.option')){
                //xử lý khi click vào song
                if(songNode){
                    console.log(songNode.dataset.index)
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }

                //xử lý khi click vào song option
                if(e.target.closest('.option')) {

                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage =`url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function(){
        this.isRandom = this.config
        this.isRepeat = this.config

        // Object.assgin(this,this.config)
    },
    scrollTopActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'center'
                }
            )
        },300)
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex
        do{
            newIndex =  Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function(){
        //Gán cấu hình từ config vào ứng dụng 
        this.loadConfig()
        //Định nghĩa các thuộc tính cho object 
        this.defineProperties()
        //Lắng nghe/xử lý các sự kiện DOM event 
        this.handleEvent()
        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
        
        //render playlist 
        this.render()

        //Hiển thị trạng thái ban đầu của btn random và repeat
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat); 
    } 
}

app.start()