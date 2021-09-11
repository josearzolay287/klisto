const {Niubiz} = require('@curiosity/niubiz');
const Usuarios = require('../models/modulos_');
const Swal = require('sweetalert2')

const visa = new Niubiz({
  user: 'integraciones@niubiz.com.pe',
  password: '_7z3@8fF',
  merchantId: '456879852',
  env: 'dev',
});
exports.pasarela = async (req, res, next) => {
	const {amount, product, userId} = req.body;
  const clientIp = '192.168.1.10';
  const domain = 'http://localhost:3000';
console.log(userId);
  try {
    const securityToken = await visa.createToken();
    const body = { 
      amount, 
      channel: visa.channel, 
      antifraud: 
        { 
          clientIp, 
          merchantDefineData: {MDD1: 'web', MDD2: 'Canl', MDD3: 'Canl'},
        },
    };
    const {
      sessionKey,
      expirationTime
    } = await visa.createSession(securityToken, body);

    let purchaseNumber = Math.floor(Math.random() * 1000000);
    req.session.visa = {securityToken, sessionKey, amount, product, purchaseNumber};
    res.render('pasarela_de_pago', {
      pageName: "Pasarela",
      sessionKey,
      expirationTime,
      merchantId: visa.merchantId,
      amount,
      product,
      domain,
      purchaseNumber,
      userId,
      dashboardPage: true,
    });
  } catch(error) {
    res.status(500).json(error);
  }
}

exports.pagar = async (req, res, next) => {
	try {
    const {
      transactionToken,
      customerEmail,
      channel,
    } = req.body;

    const {
      securityToken, 
      sessionKey, 
      amount, 
      product,
      purchaseNumber,
    } = req.session.visa;

    // inventamos un numero de compra
    

    const body = {
      antifraud: null,
      captureType: 'manual',
      channel,
      countable: true,
      order: {
        amount:  amount,
        currency: visa.currency,
        purchaseNumber,
        tokenId: transactionToken
      },
    };

    const payload = await visa.getAuthorization(securityToken, body).then(()=>{
    let userid= req.user.id
      
    Usuarios.actualizarUserMembership(userid,product).then(()=>{
      req.user.membership=product;
      res.render('complete_pay', {product, dashboardPage:true});
    })
			
    

    });

  } catch (error) {
    let errores = JSON.stringify(error);
    let parsed = JSON.parse(errores)
    const{ACTION_DESCRIPTION,STATUS} =parsed.error.data 
    console.log(parsed.error.data);
    console.log(errores);
    res.render('complete_pay', {errores,parsed,ACTION_DESCRIPTION,STATUS, dashboardPage:true});
  }
}