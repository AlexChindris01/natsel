import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


// import React, { Component } from 'react';

import { ReactP5Wrapper } from '@p5-wrapper/react';



function sketch(p5) {
  let duration;  // 5 seconds at 60 frames per second
  let currentFrame;
  let i;
  let j;
  let k;
  // let testMsg;
  // let testMsgInt;
  let path;
  let foodPath;
  let jsonStr;
  let foodJsonStr;
  let path_curr;
  const CANVAS_X = 500;
  const CANVAS_Y = 500;
  p5.setup = () => {
    // fetch('http://localhost:8080/sketchtest')
    // .then(response => response.text())
    // .then(data => {
    //     testMsg = data;
    //     testMsgInt = Number(testMsg);
    // })
    // .catch(error => console.error('Error:', error));
    jsonStr = '[[{"moveTime":1.0,"x":22.127461308817978,"y":9.29383968157205},{"moveTime":1.0,"x":34.2518349768125,"y":30.006144313332392},{"moveTime":1.0,"x":35.73958861656158,"y":53.95998720142476},{"moveTime":1.0,"x":19.223218547875927,"y":71.37289964461543},{"moveTime":1.0,"x":28.450201155707667,"y":93.52832317825096},{"moveTime":1.0,"x":16.165682390478885,"y":114.14604853064475},{"moveTime":1.0,"x":0.12830795181576704,"y":132.0010932271476},{"moveTime":1.0,"x":16.975857720251796,"y":149.09378367657865},{"moveTime":0.7066630285176325,"x":16.538132718936275,"y":166.0480467123606},{"moveTime":0.2933369714823675,"x":16.798252817587883,"y":173.08332687346407},{"moveTime":0.3316630285176102,"x":17.09235900972972,"y":181.0378043227612},{"moveTime":0.6683369714823898,"x":17.09235900972972,"y":181.0378043227612},{"moveTime":1.0,"x":39.14320511638023,"y":190.51198956376297},{"moveTime":0.9922992838217267,"x":58.856575279237376,"y":203.87409902214887},{"moveTime":0.007700716178273281,"x":58.9367624099826,"y":204.04061453838096},{"moveTime":0.6172992838217354,"x":65.36466563804905,"y":217.38871184980874},{"moveTime":0.3827007161782646,"x":65.36466563804905,"y":217.38871184980874},{"moveTime":1.0,"x":78.95711639486969,"y":237.16863304336778},{"moveTime":1.0,"x":102.57896963782318,"y":241.41222225161675},{"moveTime":1.0,"x":112.75799288285705,"y":263.1466991438049},{"moveTime":1.0,"x":135.41372315665035,"y":255.2272366771266},{"moveTime":1.0,"x":158.43374316449132,"y":248.4391088911607},{"moveTime":1.0,"x":154.9214726407838,"y":224.6975007786445},{"moveTime":1.0,"x":135.12518256436408,"y":211.1289010273715}],[{"moveTime":1.0,"x":11.557873168917283,"y":21.033676992176666},{"moveTime":1.0,"x":35.147273440109295,"y":16.613247731857474},{"moveTime":1.0,"x":53.207631920511076,"y":0.8074433689223373},{"moveTime":1.0,"x":77.12026157183035,"y":2.8534500059707515},{"moveTime":1.0,"x":76.65019712082949,"y":26.84884621882594},{"moveTime":1.0,"x":98.79912101319509,"y":36.091420016756715},{"moveTime":1.0,"x":120.33778067878501,"y":46.67849420228551},{"moveTime":1.0,"x":117.05909395848032,"y":70.45348554592427},{"moveTime":1.0,"x":109.86900179135992,"y":93.35113989365854},{"moveTime":1.0,"x":89.92930058987771,"y":106.70809748120853},{"moveTime":1.0,"x":90.93918383737876,"y":130.68684089754328},{"moveTime":0.7867838963868269,"x":108.7828341248544,"y":136.864606723125},{"moveTime":0.2132161036131731,"x":112.0623682309019,"y":140.79274286983653},{"moveTime":0.4117838963868275,"x":118.39612684311157,"y":148.3791454943092},{"moveTime":0.5882161036131726,"x":118.39612684311157,"y":148.3791454943092},{"moveTime":1.0,"x":136.8798989268328,"y":133.07064558226529},{"moveTime":1.0,"x":123.35065874299144,"y":113.24743544747801},{"moveTime":1.0,"x":139.9488667845516,"y":95.91251433980959},{"moveTime":1.0,"x":134.28102844958977,"y":72.59137353133418},{"moveTime":1.0,"x":110.94049283564487,"y":78.17880561183144},{"moveTime":1.0,"x":112.50921195517476,"y":102.12748240876579},{"moveTime":1.0,"x":106.31779125913921,"y":125.31511509873012}],[{"moveTime":1.0,"x":4.353609207557248,"y":23.601823803847715},{"moveTime":1.0,"x":24.529729703347886,"y":36.59890662036223},{"moveTime":1.0,"x":39.736654613772075,"y":55.16633602695269},{"moveTime":1.0,"x":42.32458293903596,"y":79.0263994590414},{"moveTime":1.0,"x":66.26169398422766,"y":77.29010604773039},{"moveTime":1.0,"x":88.3396476639591,"y":86.70094880040845},{"moveTime":1.0,"x":110.86523427445343,"y":94.98333661148794},{"moveTime":1.0,"x":130.6542486226567,"y":108.56254539280525},{"moveTime":1.0,"x":153.16495959378966,"y":116.88527881242847},{"moveTime":1.0,"x":165.0717275366963,"y":96.04711965299764},{"moveTime":1.0,"x":188.94378421873853,"y":98.52197515774202},{"moveTime":1.0,"x":196.4445776478617,"y":75.72420996170531},{"moveTime":1.0,"x":191.5718694685366,"y":52.22406708981753},{"moveTime":1.0,"x":213.56080223501402,"y":42.60705945795325},{"moveTime":1.0,"x":219.3762031928704,"y":19.322276622389523},{"moveTime":1.0,"x":235.03836774280933,"y":1.1372112771498522},{"moveTime":1.0,"x":258.5368405536162,"y":6.0179669112469565},{"moveTime":1.0,"x":282.4121799246154,"y":3.57498309639749},{"moveTime":1.0,"x":306.3977313814981,"y":4.40764227591335},{"moveTime":1.0,"x":328.2094568428882,"y":14.420066178093434}],[{"moveTime":1.0,"x":1.786157384460191,"y":23.933441912895404},{"moveTime":1.0,"x":21.14500070415835,"y":38.119180713655055},{"moveTime":1.0,"x":26.36148479812817,"y":61.545411603351326},{"moveTime":1.0,"x":12.998711183595923,"y":81.48121560837608},{"moveTime":1.0,"x":18.543158085862213,"y":104.83199950416744},{"moveTime":1.0,"x":11.824228294761577,"y":127.87231162146004},{"moveTime":1.0,"x":12.433058832283196,"y":151.86458799067063},{"moveTime":0.7561098261945847,"x":7.662161089988727,"y":169.37284109116413},{"moveTime":0.24389017380541533,"x":11.342053265452876,"y":173.9247929471449},{"moveTime":0.3811098261945837,"x":17.09235900972972,"y":181.0378043227612},{"moveTime":0.6188901738054162,"x":17.09235900972972,"y":181.0378043227612},{"moveTime":1.0,"x":16.252532389252565,"y":205.0231058895028},{"moveTime":1.0,"x":35.953026535143735,"y":218.73042256373586},{"moveTime":1.0,"x":43.73580597266886,"y":241.4334695889005},{"moveTime":1.0,"x":64.90294043626619,"y":252.74507507176588},{"moveTime":1.0,"x":88.73772415630425,"y":249.93383246056908},{"moveTime":1.0,"x":102.45281617879337,"y":230.23875056648558},{"moveTime":1.0,"x":126.20040050916413,"y":226.76711716534294},{"moveTime":1.0,"x":130.5080446032312,"y":203.15686086942677},{"moveTime":1.0,"x":142.13755963682405,"y":182.16270977719543},{"moveTime":1.0,"x":166.0324740583645,"y":184.40615908289834},{"moveTime":1.0,"x":184.14495202207297,"y":200.15221071542436}],[{"moveTime":1.0,"x":23.202569499206863,"y":6.135207301670855},{"moveTime":1.0,"x":27.10762642217705,"y":29.81537897394474},{"moveTime":1.0,"x":30.845040931474955,"y":53.52258743014408},{"moveTime":1.0,"x":40.602667674579806,"y":75.44948233895971},{"moveTime":1.0,"x":27.067585213509705,"y":95.2687038870436},{"moveTime":1.0,"x":6.480106146191723,"y":82.93356279937282},{"moveTime":1.0,"x":13.457549287837061,"y":59.97021619646874},{"moveTime":1.0,"x":13.423197938433086,"y":35.970240780131455},{"moveTime":1.0,"x":36.50621057256718,"y":29.399508116843002},{"moveTime":1.0,"x":59.760575456669635,"y":35.335374846902106},{"moveTime":1.0,"x":59.70139321923946,"y":59.33530187726561},{"moveTime":1.0,"x":80.40597892082202,"y":71.47285232724616},{"moveTime":1.0,"x":101.70630332588098,"y":82.53161266641844},{"moveTime":1.0,"x":102.99741463439744,"y":106.49685899498809},{"moveTime":1.0,"x":108.7690308178613,"y":129.7925334138749},{"moveTime":1.0,"x":110.0738579381433,"y":153.7570368759994},{"moveTime":1.0,"x":86.1345016059322,"y":155.4620935904298},{"moveTime":1.0,"x":62.9530534540806,"y":149.24755727763733},{"moveTime":1.0,"x":48.84884185621357,"y":168.66587891475604},{"moveTime":1.0,"x":67.61472575172351,"y":183.6272158075688}],[{"moveTime":1.0,"x":18.364007196940346,"y":15.451965560106688},{"moveTime":1.0,"x":40.901358620709814,"y":7.201644911700562},{"moveTime":1.0,"x":64.86435538745013,"y":8.533855839892237},{"moveTime":1.0,"x":87.30657764053197,"y":0.02817183780998178},{"moveTime":1.0,"x":98.63352482267646,"y":21.18710062763554},{"moveTime":1.0,"x":78.52963400321345,"y":34.29563120581671},{"moveTime":1.0,"x":54.86225204319711,"y":38.277468866833715},{"moveTime":1.0,"x":38.122600148872124,"y":21.07909526765807},{"moveTime":1.0,"x":16.866996183550633,"y":9.93462129759518},{"moveTime":1.0,"x":0.7043588430928978,"y":27.676356111328623},{"moveTime":1.0,"x":1.0135578956122997,"y":51.674364277547774},{"moveTime":1.0,"x":5.20547132997115,"y":75.30544258047},{"moveTime":1.0,"x":24.744480917975544,"y":89.24198104308232},{"moveTime":1.0,"x":27.361604392874618,"y":113.09885981456314},{"moveTime":1.0,"x":13.567128603074966,"y":132.738422887214},{"moveTime":1.0,"x":0.2963375519261895,"y":152.73557530641483},{"moveTime":1.0,"x":11.60258387034205,"y":173.90557280729584},{"moveTime":1.0,"x":34.961613731055486,"y":168.3959699208531},{"moveTime":1.0,"x":49.39502715518712,"y":187.57086436458073},{"moveTime":1.0,"x":73.38452195168381,"y":188.2808921167558}],[{"moveTime":1.0,"x":1.153711202764975,"y":23.972253762644318},{"moveTime":1.0,"x":11.908373964938775,"y":45.42772460044958},{"moveTime":1.0,"x":20.139939454232046,"y":67.97193293863427},{"moveTime":1.0,"x":24.793152928857097,"y":91.51652051963828},{"moveTime":1.0,"x":47.53726630528962,"y":99.17845935520614},{"moveTime":1.0,"x":43.205137025300814,"y":122.7842352564864},{"moveTime":0.11999177275770162,"x":41.63362903821377,"y":125.19745413415463},{"moveTime":0.625,"x":27.851481290635306,"y":131.11796116175978},{"moveTime":0.25500822724229844,"x":27.851481290635306,"y":131.11796116175978},{"moveTime":1.0,"x":6.8073152755544655,"y":142.65672525197832},{"moveTime":1.0,"x":6.837372610991243,"y":166.65670643023316},{"moveTime":1.0,"x":4.730740388440213,"y":190.56407141843104},{"moveTime":1.0,"x":22.90358455246626,"y":206.24041458225673},{"moveTime":1.0,"x":46.79550478063542,"y":203.96529968168548},{"moveTime":0.32970494776303233,"x":53.205313120860986,"y":208.60519624597686},{"moveTime":0.625,"x":65.36466563804905,"y":217.38871184980874},{"moveTime":0.045295052236967726,"x":65.36466563804905,"y":217.38871184980874},{"moveTime":1.0,"x":75.27295363589724,"y":239.2479393968127},{"moveTime":1.0,"x":73.20643352903183,"y":263.1588050157718},{"moveTime":1.0,"x":49.44309553612918,"y":266.5209126040368},{"moveTime":1.0,"x":34.06758890887719,"y":284.9489834731031},{"moveTime":1.0,"x":28.20569423938224,"y":308.22210511339335},{"moveTime":0.9367232585700064,"x":28.233986847028664,"y":330.7034455160574},{"moveTime":0.06327674142999362,"x":28.288196071732443,"y":332.22111947904693},{"moveTime":0.5617232583902959,"x":28.76942474528621,"y":345.6938860070217},{"moveTime":0.4382767416097041,"x":28.76942474528621,"y":345.6938860070217}],[{"moveTime":1.0,"x":20.5718110652732,"y":12.361253556767743},{"moveTime":1.0,"x":23.663557600740212,"y":36.16127673659737},{"moveTime":1.0,"x":4.3071907208572675,"y":50.35039444036495},{"moveTime":1.0,"x":5.870175811688999,"y":74.29944614613898},{"moveTime":1.0,"x":21.954411206301973,"y":92.11228903464723},{"moveTime":1.0,"x":45.37905289437842,"y":97.3359048116001},{"moveTime":1.0,"x":55.63959399280035,"y":119.0320172829069},{"moveTime":1.0,"x":53.36421922089117,"y":142.92391276332785},{"moveTime":1.0,"x":43.10369074677727,"y":164.620031204927},{"moveTime":1.0,"x":28.678052166787403,"y":183.80077549599943},{"moveTime":1.0,"x":26.883454628537734,"y":207.73358602204732},{"moveTime":1.0,"x":15.61522047670145,"y":228.92384083645175},{"moveTime":1.0,"x":20.270786606465933,"y":252.46796333042866},{"moveTime":1.0,"x":44.17202865710016,"y":250.29296254031516},{"moveTime":1.0,"x":68.11096366142321,"y":252.00392450914916},{"moveTime":1.0,"x":79.34823236621926,"y":230.79723235652403},{"moveTime":1.0,"x":94.0442690846962,"y":211.82286794637375},{"moveTime":1.0,"x":92.06383926480765,"y":187.90471798178626},{"moveTime":1.0,"x":111.08525797477364,"y":173.2696358070885},{"moveTime":1.0,"x":132.18915415331696,"y":161.84048159143174}],[{"moveTime":1.0,"x":23.99303842908378,"y":0.5780198443903264},{"moveTime":1.0,"x":47.47776921753463,"y":5.524475120038604},{"moveTime":1.0,"x":66.92747632202574,"y":19.58537457738158},{"moveTime":1.0,"x":85.28352569564967,"y":4.12395642143351},{"moveTime":1.0,"x":108.55783739518962,"y":9.981124244934701},{"moveTime":1.0,"x":106.37721760694009,"y":33.88185430363991},{"moveTime":1.0,"x":105.16119149957274,"y":57.851027850222636},{"moveTime":1.0,"x":112.57277197273947,"y":80.67795219166149},{"moveTime":1.0,"x":132.75596432614074,"y":93.66405039033552},{"moveTime":1.0,"x":156.54016453336374,"y":96.87525273567802},{"moveTime":1.0,"x":180.45927840509637,"y":98.84400655245828},{"moveTime":1.0,"x":187.42279110408137,"y":121.81158132410265},{"moveTime":1.0,"x":178.8351893989829,"y":144.22258524973233},{"moveTime":1.0,"x":158.1412937622261,"y":156.3783527440133},{"moveTime":0.23423320546079604,"x":153.442233493938,"y":159.46399443583195},{"moveTime":0.625,"x":140.39857278438194,"y":166.87094490778665},{"moveTime":0.14076679453920393,"x":140.39857278438194,"y":166.87094490778665},{"moveTime":1.0,"x":147.92029794797162,"y":189.6618126087633},{"moveTime":0.2802591879013202,"x":153.13848565040828,"y":193.90593318272545},{"moveTime":0.625,"x":166.43885499551843,"y":200.84136217332554},{"moveTime":0.0947408120986798,"x":166.43885499551843,"y":200.84136217332554},{"moveTime":1.0,"x":156.46183171198842,"y":222.66930312981293},{"moveTime":1.0,"x":177.17086786150537,"y":234.79925868447182},{"moveTime":1.0,"x":197.91946756060833,"y":246.86141481537913}],[{"moveTime":1.0,"x":21.534012398772525,"y":10.596523486951329},{"moveTime":1.0,"x":44.73992735945416,"y":4.473982279445067},{"moveTime":1.0,"x":68.71965350779638,"y":5.460254985400109},{"moveTime":1.0,"x":92.69193814645257,"y":6.613324455661364},{"moveTime":1.0,"x":116.68672713618452,"y":7.113425783632312},{"moveTime":1.0,"x":140.62270533818224,"y":8.865266961790411},{"moveTime":1.0,"x":144.37853372374516,"y":32.56956516144609},{"moveTime":1.0,"x":150.47814141183608,"y":55.78151867792941},{"moveTime":1.0,"x":141.2943522686024,"y":77.95488145790989},{"moveTime":1.0,"x":130.19661927191518,"y":99.23492662548976},{"moveTime":1.0,"x":144.8117171088296,"y":118.27170458861733},{"moveTime":1.0,"x":167.09557639118313,"y":127.18403399704174},{"moveTime":1.0,"x":181.80776355785872,"y":108.22218944613618},{"moveTime":1.0,"x":203.91850234291414,"y":117.5557434519287},{"moveTime":1.0,"x":214.06572082711065,"y":95.80639962196499},{"moveTime":1.0,"x":235.90702222420936,"y":105.75414073646402},{"moveTime":1.0,"x":246.60001602005792,"y":84.267868754523},{"moveTime":1.0,"x":248.85216587093686,"y":60.37377280909777},{"moveTime":1.0,"x":272.4181566787867,"y":55.830197427931914},{"moveTime":1.0,"x":288.5190868386918,"y":73.62795144314008}]]';
        foodJsonStr = '[{"x":120.10202828526445,"y":330.14961623105586},{"x":27.851481290635306,"y":131.11796116175978},{"x":140.39857278438194,"y":166.87094490778665},{"x":166.43885499551843,"y":200.84136217332554},{"x":118.39612684311157,"y":148.3791454943092},{"x":17.09235900972972,"y":181.0378043227612},{"x":28.76942474528621,"y":345.6938860070217},{"x":304.35661951325676,"y":215.38462183306066},{"x":269.30364714795456,"y":93.98420357991216},{"x":65.36466563804905,"y":217.38871184980874},{"x":109.85058912744533,"y":304.4498564581914},{"x":407.30228169696943,"y":356.5081395785541},{"x":300.327606133395,"y":125.35851526457425},{"x":265.35339506699927,"y":326.4818216381625},{"x":262.9456188497531,"y":73.3479081153734},{"x":416.63508181736734,"y":325.81401773199724},{"x":177.15298633587201,"y":252.6838698722126},{"x":396.7438132366339,"y":497.2551123993564},{"x":289.70810417438844,"y":42.37252040956635},{"x":247.27292156466618,"y":405.6396625266604}]';
            p5.createCanvas(CANVAS_X, CANVAS_Y, p5.WEBGL);
    path = JSON.parse(jsonStr);
    foodPath = JSON.parse(foodJsonStr);
    // duration = path[0][1].moveTime * 75;
    // currentFrame = 0;
      path_curr = [];
      duration = [];
      currentFrame = [];
    for (i = 0; i < path.length; i++) {
        path_curr[i] = 0;
        duration[i] = path[i][1].moveTime * 75;
        currentFrame[i] = 0;
    }
    i = 0;

  }

  p5.draw = () => {
    p5.translate(-CANVAS_X / 2, -CANVAS_Y / 2);
    let x;
    let y;
    p5.background(255); // Clear the canvas with a white background
    p5.fill('rgb(0, 255, 0)');
    for (j = 0; j < foodPath.length; j++) {
        p5.ellipse(foodPath[j].x, foodPath[j].y, 5, 5);
      }
    p5.fill(0);

    // Calculate the current position of the dot
    for (j = 0; j < path.length; j++) {
        x = p5.lerp(path[j][path_curr[j]].x, path[j][path_curr[j] + 1].x, currentFrame[j] / duration[j]);
        y = p5.lerp(path[j][path_curr[j]].y, path[j][path_curr[j] + 1].y, currentFrame[j] / duration[j]);

        if (j === 0) p5.fill('red');
        if (j === 1) p5.fill('blue');
        if (j === 2) p5.fill('green');
        if (j === 3) p5.fill('yellow');
        if (j === 4) p5.fill('purple');
        if (j === 5) p5.fill('orange');
        if (j === 6) p5.fill('brown');
        if (j === 7) p5.fill('white');
        if (j === 8) p5.fill('black');
        if (j === 9) p5.fill('pink');
        p5.ellipse(x, y, 10, 10);
    }


    // Update the frame counter
    for (j = 0; j < path.length; j++) {
        if (currentFrame[j] < duration[j]) {
            currentFrame[j]++;
        }
        else {
            for (k = 0; k < foodPath.length; k++) {
                if (path[j][path_curr[j] + 1].x === foodPath[k].x && path[j][path_curr[j] + 1].y === foodPath[k].y) {
                    foodPath.splice(k, 1);
                }
            }
            currentFrame[j] = 0;
            path_curr[j]++;
            duration[j] = path[j][path_curr[j] + 1].moveTime * 75;
        }
    }

  };
}


function App() {
  const [population, setPopulation] = useState('');
  const [startWarning, setStartWarning] = useState('');

  useEffect(() => {
      fetch('http://localhost:8080/load')
    .then(response => response.text())
    .then(data => {
        setPopulation(data);
    })
    .catch(error => console.error('Error:', error));
  }, [])

  const start = () => {
      fetch('http://localhost:8080/start')
        .then(response => response.text())
        .then(data => {
          setPopulation(data);
          if (startWarning !== '') {
              setStartWarning('');
          }
        })
        .catch(error => console.error('Error:', error));

  };

  const reducefood = () => {
      fetch('http://localhost:8080/reducefood')
        .then(response => response.text())
        .then(data => {
          if (data === '') {
              setStartWarning('Start evolution first');
          }
          else {
              setPopulation(data);
          }
        })
        .catch(error => console.error('Error:', error));

  };



  const [showSketch, setShowSketch] = useState(false);
  const toggleSketch = () => {
      setShowSketch(true);
  }

  if (showSketch === false) {
      return (
          <div>
              <h2>Natural selection simulation</h2>
              <button onClick={toggleSketch}>Show sketch</button>
              <button onClick={start}>Start</button>
              <button onClick={reducefood}>Reduce amount of food</button>
              <div id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>

          </div>
      );
  }
  else {
      return (
          <div>

              <h2>Natural selection simulation</h2>
              <button onClick={toggleSketch}>Show sketch</button>
              <button onClick={start}>Start</button>
              <button onClick={reducefood}>Reduce amount of food</button>
              <div id="response">{population}</div>
              <div id="startWarning">{startWarning}</div>
              <div className="sketch-div">
                  <ReactP5Wrapper sketch={sketch}/>
              </div>
          </div>
      );
  }




}

export default App;