
import imagemin from 'imagemin';
import imageminPngquant from'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminWebp from 'imagemin-webp'


const PNGImages = 'src/row-img/*.png';
const JPEGImages = 'src/row-img/*.jpg';
const output = 'src/img';

//оптимзиция PNG
const optimisePNGImages = async () => {
    await imagemin([PNGImages], {
        destination: output,
        plugins: [
            imageminPngquant({ quality: [0.65,0.80] })
        ]
    });

    console.log('Images optimized');
};

//оптимзиция JPEG
const optimiseJPEGImages = async () =>{
    await imagemin([JPEGImages], output, {
        plugins: [
            imageminMozjpeg({
                quality: 70,
            }),
        ]
    })
console.log('JPEG optimized');
}
const convertPNGToWebp = async () =>{
    await imagemin([PNGImages],  {
        destination: output +'/wemb/',
        plugins: [
            imageminWebp({
                quality: 85,
            })
        ]
    }).then(() => {
        console.log('convertPNGToWebp');
    })}

const convertJPGToWebp = async () => {
    await imagemin([JPEGImages],  {
        destination: output +'/wemb/',
        plugins: [
            imageminWebp({quality: 75})
        ]
    }).then(() => {
        console.log('convertJPGToWebp');
    })}

optimisePNGImages()
    .then(() => convertPNGToWebp())
    .then(() => optimiseJPEGImages())

    .then(() => convertJPGToWebp())
    .catch(error => console.log(error));