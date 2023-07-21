let kalemRengi = "#000000";
let kalemBoyutu = 1;
let cizimModu = false;
let silmeModu = false;
let canvasGecmisi = [];
let gecmisIndex = -1;
let canvas = new fabric.Canvas('canvas');
let fosforluKalemAktif = false;
let fosforluKalemRenk = "rgba(255,255,0,0)";
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = kalemBoyutu;
canvas.freeDrawingBrush.color = kalemRengi;

function renkDegistir(renk) {
    kalemRengi = renk;
    canvas.freeDrawingBrush.color = kalemRengi;
}

function boyutDegistir(boyut) {
    kalemBoyutu = parseInt(boyut);
    canvas.freeDrawingBrush.width = kalemBoyutu;
}

function temizle() {
    canvas.clear();
    canvasGecmisi = [];
    gecmisIndex = -1;
}

function cizgiCiz() {
    canvas.isDrawingMode = true;
    cizimModu = true;
    silmeModu = false;
    canvasGuncellendi();
}

function kareCiz() {
    canvas.isDrawingMode = false;
    cizimModu = false;
    silmeModu = false;
    let x = 20;
    let y = 20;
    let width = 40;
    let height = 40;

    let rect = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        fill: kalemRengi,
        stroke: "black",
        strokeWidth: kalemBoyutu
    });

    canvas.add(rect);
}

function dikdortgenCiz() {
    canvas.isDrawingMode = false;
    cizimModu = false;
    silmeModu = false;

    let x = 80;
    let y = 20;
    let width = 60;
    let height = 40;

    let rect = new fabric.Rect({
        left: x,
        top: y,
        width: width,
        height: height,
        fill: kalemRengi,
        stroke: "black",
        strokeWidth: kalemBoyutu
    });

    canvas.add(rect);
}

function daireCiz() {
    canvas.isDrawingMode = false;
    cizimModu = false;
    silmeModu = false;

    let x = 180;
    let y = 40;
    let radius = 20;

    let circle = new fabric.Circle({
        left: x,
        top: y,
        radius: radius,
        fill: kalemRengi,
        stroke: "black",
        strokeWidth: kalemBoyutu
    });

    canvas.add(circle);
}

function cizimModunuDegistir() {
    cizimModu = !cizimModu;
    canvas.isDrawingMode = cizimModu;
    silmeModu = false;
    if (cizimModu) {
        canvasGuncellendi();
    }
    canvas.renderAll();
}

function silmeModunuDegistir() {
    silmeModu = !silmeModu;
    if (silmeModu) {
        canvas.freeDrawingBrush.color = "rgba(255, 255, 255, 0.7)";
        cizimModu = false;
        canvas.isDrawingMode = false;
    } else {
        canvas.freeDrawingBrush.color = kalemRengi;
        canvas.isDrawingMode = cizimModu;
    }
    if (!silmeModu) {
        canvasGuncellendi();
    }
}


function sil() {
    let aktifNesne = canvas.getActiveObject();
    if (aktifNesne) {
        canvas.remove(aktifNesne);
        canvasGuncellendi();
        canvasGecmisi.push(canvas.toJSON());
    }
}

function kaydetCanvasDurumu() {
    let canvasDurumu = canvas.toJSON();
    canvasGecmisi.push(canvasDurumu);
    gecmisIndex = canvasGecmisi.length - 1;
}

function canvasGuncellendi() {

    kaydetCanvasDurumu();
}

document.addEventListener('sil', function(event) {

    if (event.key === 'sol') {
        geriAl();
    } else if (event.key === 'sağ') {
        ileriAl();
    }
});

function geriAl() {
    if (gecmisIndex > 0) {
        gecmisIndex--;
        canvas.loadFromJSON(canvasGecmisi[gecmisIndex], function() {
            canvas.renderAll();
        });
    }
}

function ileriAl() {
    if (gecmisIndex < canvasGecmisi.length - 1) {
        gecmisIndex++;
        canvas.loadFromJSON(canvasGecmisi[gecmisIndex], function() {
            canvas.renderAll();
        });
    }
}

function metinEkle() {
    let metin = document.getElementById('metin').value;
    let metinNesnesi = new fabric.Text(metin, {
        left: 50,
        top: 50,
        fill: kalemRengi,
        fontSize: 24
    });
    canvas.add(metinNesnesi);
    canvasGecmisi.push(canvas.toJSON());
}


function fosforluKalem() {
    fosforluKalemAktif = !fosforluKalemAktif;
    if (fosforluKalemAktif) {

        canvas.freeDrawingBrush.color = fosforluKalemRenk;
        canvas.isDrawingMode = true;
        cizimModu = true;
        silmeModu = false;
    } else {
        canvas.freeDrawingBrush.color = kalemRengi;
        canvas.isDrawingMode = cizimModu;
    }
}

function fosforluKalemRengiSec(renk) {
    fosforluKalemRenk = renk;
    if (fosforluKalemAktif) {
        canvas.freeDrawingBrush.color = fosforluKalemRenk;
        canvas.isDrawingMode = true;
        cizimModu = true;
        silmeModu = false;
        canvasGuncellendi();
    }
}

// AÇIKLAMA //
// HTML Tarafında ilk olarak canvas üzerinde div içersinde bir çizim alanı oluşturdum ve CSS tarafında düzenlemek için de .canvas-container sınıfı oluşturdum
// ve canvasın genişlik ve yüksekliğini 600 px olarak ayarladım ve js tarafında ulaşım sağlamak içinde canvas adında id oluşturdum daha sonra tools-container adında div etiketi-
// içersinde çizim araçlarının olduğu bi guruplama yaptım daha sonra label adında bir etiket oluşturdum bu etiket kalem rengi vs içeriyor ve aynı şekilde js de ulaşım sağlamak için id veriyorum -
// ve for etiketi ilede input ile ilişkilendirdim ve daha sonra renk seçimi için bir input oluşturdum type=color ile de kullanıcının renk seçmesini sağladım ve aynı şekilde id tanımladım -
// aynı şekilde yeniden bir label etiketi açtım ve js tarafında ulaşım sağlamak adına id tanımladım ve boyut için yine aynı şekilde for etiketi açıp input ile ilşkilendirdim-
// ve boyutu belirledim min=1 max=20 olcak şekilde ama en baştaki ilk atanan değer 1'dir metin girişi içinde input etiketi açıp daha sonta kullanıcının metin gire bilmesi içinde type=text oluşturdum.

//CSS Tarafında dispilay-flex ile yatay bir şekilde olmasını istedim ve justify-content ile ortaladım ve 20 px lik bir boşluk bıraktım ve aynı şekilde genişlik ve yükseklik verdim 600px olarak -
// 2px olarak kenarlik verdim siyah olarak ve hepsini guruplayarak aldığım için gurup halinde bir konumlandırma yaptım 
// çizim araçları için display flex verdim dikey bir şekilde oluşması için daha sonra dikey bir hiza belirlemesi için lex-direction column verdim ve gap ile de 10 px lik aralarında boşluk bıraktım-
//margin-bottom ile 20px alt taraftan boşluk bıraktım üst üste gelmemesi için ve metin yazılarını belirgin kalın yapsın diyede bold verdim ve metin boyutunu da 14 px olarak ayarladım-
// ve kenarlık yaptım daha sonra button renklerini ayarladım ve maous içinde pointer kullandım ve buttona basma hissi versin diyede basldığında %95 küçülme ekledim.

//JS Tarafında 9 tane değişken tanımladım renk değiştir adında birtane fonksiyon oluşturdum parametre olarak renk verdim ve canvs.freedrawingbrush.color özelliğine ayarladım
// aynı şekilde fonksiyon üzerinden ilerleyip farklı farklı parametreler oluşturdum ve işleve girebilmesi için methotlarımı çağırdım sadece metin eklemede bir kaç özellik tanımladım-
// left veya top yazı kalınlığı vs gibi ve şekillerde de aynı şekilde sadece şekillerde kordinatlar belirledim ve cizimmodu silme modu true .false şekilde değer ataması yaptım.