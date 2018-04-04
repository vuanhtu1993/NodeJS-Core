$(function () {
    $("#wheel-demo").minicolors({
        control: $("#wheel-demo").attr('data-control') || 'hue',
        inline: $("#wheel-demo").attr('data-inline') === 'true',
        letterCase: 'lowercase',
        opacity: false,
        /*---Mỗi khi mã màu thay đổi thì sẽ chạy brain.js để tính toán---*/
        change: function (hex, opacity) {
            if (!hex) return;
            if (opacity) hex += ', ' + opacity;
            $("#wheel-demo").select();
            const rgb = getRgb(hex);
            console.log(rgb);

            /*=====Lấy mạng Neural đã được training nhận diện đậm nhạt và truyền mã màu vừa chọn vào để nó nhận diện sáng tối=====*/
            const resultA = brain.likely(rgb, ColorDarknetwork)
            $("#example").css("background", hex);
            $("#example").css("color", resultA === "dark" ? "white" : "black");

            /*=====Lấy mạng Neural đã được training nhận diện tên màu sắc và truyền mã màu vừa chọn vào để nó nhận diện tên=====*/
            const resultB = brain.likely(rgb, ColorNameNetwork)
            $("#example").html(resultB);
        },
        theme: 'bootstrap'
    });
});
/*----- Tạo ra mạng Neural thứ nhất. Dùng để đào tạo nhận diện độ đậm nhạt của màu ----*/
const brain = require('brain.js');
const ColorDarknetwork = new brain.NeuralNetwork();
/*------Bắt đầu Training mạng này với tập đầu vào bên dưới ---*/
ColorDarknetwork.train([
    { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },  //Đây là một phần tử dùng để huấn luyện, gồm đầu vào và đầu ra.
    { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
    { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
    { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
    { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
    { input: {r: 1, g: 0.99, b: 0}, output: { light: 1 } },
    { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
]);

/*----- Tạo ra mạng Neural thứ nhất. Dùng để đào tạo nhận diện tên của màu ----*/
const ColorNameNetwork = new brain.NeuralNetwork();
/*------Bắt đầu Training mạng này với tập đầu vào bên dưới ---*/
ColorNameNetwork.train([
    { input: { r: 1, g: 0.13333333333333333, b: 0.10588235294117647 }, output: { red: 1 } },
    { input: { r: 1, g: 0.35294117647058826, b: 0.1450980392156863 }, output: { red: 1 } },
    { input: { r: 1, g: 0.5058823529411764, b: 0.4470588235294118 }, output: { red: 1 } },
    { input: { r: 1, g: 0.6470588235294118, b: 0.615686274509804 }, output: { red: 1 } },
    { input: { r: 0.7568627450980392, g: 0.1411764705882353, b: 0.13725490196078433 }, output: { red: 1 } },
    { input: { r: 0.7568627450980392, g: 0.1411764705882353, b: 0.2901960784313726 }, output: { red: 1 } },
    { input: { r: 0.7568627450980392, g: 0.34509803921568627, b: 0.4196078431372549 }, output: { red: 1 } },
    { input: { r: 0.788235294117647, g: 0, b: 0.21568627450980393 }, output: { red: 1 } },
    { input: { r: 1, g: 0.36470588235294116, b: 0.06666666666666667 }, output: { red: 1 } },
    { input: { r: 1, g: 0.2549019607843137, b: 0.42745098039215684 }, output: { pink: 1 } },
    { input: { r: 1, g: 0.26666666666666666, b: 0.6392156862745098 }, output: { pink: 1 } },
    { input: { r: 1, g: 0.10196078431372549, b: 0.7686274509803922 }, output: { pink: 1 } },
    { input: { r: 1, g: 0.011764705882352941, b: 0.7607843137254902 }, output: { pink: 1 } },
    { input: { r: 1, g: 0.18823529411764706, b: 0.6901960784313725 }, output: { pink: 1 } },
    { input: { r: 1, g: 0.4196078431372549, b: 0.7333333333333333 }, output: { pink: 1 } },
    { input: { r: 0.9333333333333333, g: 0.2823529411764706, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.7607843137254902, g: 0.07058823529411765, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.8509803921568627, g: 0.5176470588235295, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.9411764705882353, g: 0.7764705882352941, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.5137254901960784, g: 0.2549019607843137, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.47058823529411764, g: 0.4392156862745098, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.5529411764705883, g: 0.5058823529411764, b: 1 }, output: { purple: 1 } },
    { input: { r: 0.2901960784313726, g: 0.22745098039215686, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.5254901960784314, g: 0.5647058823529412, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.2784313725490196, g: 0.3568627450980392, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.0196078431372549, g: 0.12549019607843137, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.07058823529411765, g: 0.592156862745098, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.2980392156862745, g: 0.9254901960784314, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.5215686274509804, g: 1, b: 0.9294117647058824 }, output: { blue: 1 } },
    { input: { r: 0.596078431372549, g: 1, b: 0.7529411764705882 }, output: { green: 1 } },
    { input: { r: 0.37254901960784315, g: 1, b: 0.43137254901960786 }, output: { green: 1 } },
    { input: { r: 0.07450980392156863, g: 1, b: 0.34901960784313724 }, output: { green: 1 } },
    { input: { r: 0.1568627450980392, g: 1, b: 0.07450980392156863 }, output: { green: 1 } },
    { input: { r: 0.6509803921568628, g: 1, b: 0.396078431372549 }, output: { green: 1 } },
    { input: { r: 0.788235294117647, g: 1, b: 0.6235294117647059 }, output: { green: 1 } },
    { input: { r: 0.8274509803921568, g: 1, b: 0.08627450980392157 }, output: { green: 1 } },
    { input: { r: 0.7607843137254902, g: 1, b: 0.11764705882352941 }, output: { green: 1 } },
    { input: { r: 0.12549019607843137, g: 1, b: 0.5529411764705883 }, output: { green: 1 } },
    { input: { r: 0.9176470588235294, g: 1, b: 0.3411764705882353 }, output: { yellow: 1 } },
    { input: { r: 1, g: 0.7803921568627451, b: 0.3411764705882353 }, output: { yellow: 1 } },
    { input: { r: 0.8941176470588236, g: 1, b: 0 }, output: { yellow: 1 } },
    { input: { r: 1, g: 0.9254901960784314, b: 0.027450980392156862}, output: { yellow: 1 } },
    { input: { r: 1, g: 0.9686274509803922, b: 0.4980392156862745 }, output: { yellow: 1 } },
    { input: { r: 1, g: 0.8509803921568627, b: 0.38823529411764707 }, output: { yellow: 1 } },
    { input: { r: 1, g: 0.6313725490196078, b: 0 }, output: { orange: 1 } },
    { input: { r: 1, g: 0.5647058823529412, b: 0.2901960784313726 }, output: { orange: 1 } },
    { input: { r: 1, g: 0.7529411764705882, b: 0.5843137254901961 }, output: { orange: 1 } },
    { input: { r: 1, g: 0.4627450980392157, b: 0.08235294117647059 }, output: { orange: 1 } },
    { input: { r: 1, g: 0.42745098039215684, b: 0 }, output: { orange: 1 } },
    { input: { r: 0.6274509803921569, g: 0.3137254901960784, b: 0.050980392156862744 }, output: { brown: 1 } },
    { input: { r: 0.6274509803921569, g: 0.39215686274509803, b: 0 }, output: { brown: 1 } },
    { input: { r: 0.6274509803921569, g: 0.4980392156862745, b: 0.28627450980392155 }, output: { brown: 1 } },
    { input: { r: 0.6274509803921569, g: 0.5411764705882353, b: 0.23921568627450981 }, output: { brown: 1 } },
    { input: { r: 0.8588235294117647, g: 0.6431372549019608, b: 0.3254901960784314 }, output: { brown: 1 } },
    { input: { r: 0.6274509803921569, g: 0.5647058823529412, b: 0.4588235294117647 }, output: { brown: 1 } }
]);

/*----Hàm dùng để chuyển đổi từ mã màu Hex sang mã màu RGB----*/
function getRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
    } : null;
}