var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var expressSanitizer=require("express-sanitizer");

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogschem=new mongoose.Schema({title : String,image:String,body:String,created:{type: Date,default:Date.now}});
var blogms =mongoose.model("blogms",blogschem);

// var blog1=new blogm({title:"dogs",
// image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhAQEBAQDxAPDw8PDw8PDw8PDw8NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFSsdHR0rLS0tLS0tLS0tLSstKy0tKy0tLS0tKy0tLS0tLS0tLTctLTctLTc3KzcrNysrKy0rK//AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADYQAAIBAwIEAwcDBAEFAAAAAAABAgMEESExBRJBUWFxgQYTIjKRofCxwdEUUnLh8QcVI0Ji/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAIhEBAQACAQQCAwEAAAAAAAAAAAECEQMEEiExIkEyQlET/9oADAMBAAIRAxEAPwDyWSZB5Jk8TT0xchKFZxaaFsneYM8BX0L2T4221DXJ9JtJ5SPk/sBac03M+sW0cJHqcNtx3XDyyTLwZcheVQtUkLJtse0kh2LI2VTKVJjA5Xq6AYz/ADxBVplactRdm0czhGbWrOUnFbLd+IevUzpnzFZT6Lv9wWtEm0vF7IRm299cvp2G66zp9xK4qdECmhepUa6arp0T7AVLrKXogdxUxu/p+hn1rj6eJO08jeo3yWwWrcafMl65Z5L+pktmOW1zJrDf3SNMmuLYpwzrzR9F++RyEml0a7LY82+JOk8Syl0eeYap8R5llP1yl+xt6bW2lXunrsvuZlW4k9mn6rP0B3V1lP8AujrvujMldReuz7i3LZpiYq37W+fsSN/4teaMi4uc76+Kf3F41X0ZK1WR6u2vvE0ozzqePtrlm3YXTkh8Mk8sWjc01JNM8Txa0cJPsezhV7mZx23Uotm5cO6BhlqvIJnclJaPBEzh064JkmSuSZFoxbJCuSZAK2SJlcnUZmVKkwbizXnQFqlE6OxDuZ2S0FlpdwlWiN8BtHOtBeJscN3TXLUfTvYfh3JTi3u0e1gtDM4LQUYRXgacmepJqacNu6pNgqE02/AlaeE34CnCKqlz+DwC3yM9NLICvILNitaQaEBqSKxqAa8waqYT8yez6Fq1cC6qfXUDObbCxj19EaXY2acrVXovUzbut+d/9DFxPHUxLxtt6v0jn131Nk0Vr3OX08+i8jPuKmeuPPRh2mls36fmBWrnpHBKyqQJSf8AcHp1vETnnx9SnM/IWeBpzitvOpTcqcvijryptSaXVb5+h5i241Vpyw1to87M3YXLiZ/FaEZrnjFJ7tba9x97CPUWVancUsx3ws4esZGDcuUJOL0af1XcS9krl07mMG2o1cwl25t4v66epu+0NHWM1vs/MTKGl1WTOr+dPMGpgqr0yV5iZztKs9n9TY4TUecmBRkbljLlig4hl6barBJYkmjOjUGKFQttJ5jjFHlk8dTPUje9oKGmTzqZycmOq6MMvAykdyCTLojYfa6ZMnCA0ba2TqKHUDTNGdMWqUjQmgM4nbpy7ZVWia3snSXvULzpGl7NwxVQ/HPlC5Xw+qcPXwoYmL2HyryGJHa5SHEp4g/EW9nqbUZN41edAftBccqwi/B7he55m9t34kv3U/U/Vq6i1WqLu5Ty1qKzr50NlkMxXuKgNz0f50A1HqvUlN6SJbU07Qefr9i3ErpQjpvjIvb1NTJ49ctP008kGXUDW6WqXzcnzPPZLXzf1yEo1lLRrH52PNTulnCeJddvl7j9lfU3HMJKbWFLVN58eozWNx20d1+fczb6Dj/J3/uK+3Xf6g6txzLKYKEhKcmD5jtT86AnP1JU64GtB9Cyn4HJ1DNpmZlCcZ9YyUl6PJ7DibU4ZWqx7yLXbT9pHjb1+J6Dgdfnt0m8um5U3/i1lfrj0GFlSBJB6kcNooo7EzQWzhlmtzClCPKvEupmgU/TmM0J6iNKYxTeo5VuMax9Dyzi+x7KvT5omTOw8DZcfcXv0xIoLFDtWya6C/Lghlx2GnIqok5QyRME+03+gDidUQ2CKIO03ebcjsdQUkMWsDrkRuS8aGTR4PRxUTJQpGhZU/iRfHHSGWb2dh8q8hqQpY7IbkXK8h7YVsYXfT0AUqDqWkqcJyjLlck4Nr4jntm9Y+v0DeyGXCae2yOXfzsdXrCV5z2P4nJValtOMspz/wDJOpKUpbYWHt1PZUKK3MuPBYxuHWWE3o1jU3EuVFM9bTnpnXK1BU9n33GKiy2Cpw0f5oT15U34Jc+JPt+xn+0SzTbXTXPU0rqK1My+qpxcWtGuV9Fr4mGPk/HrqSU4ptNtJtdsilRcklKivd/DFZjKUuf4Em2+7eW+2Xg0vaDh81VkkuaLzh4bUkZ9vwqu9mkv/tPRFuOyRPkxtvg9aceq/BGp8T+VSXzevc3rfiDx/Gxi2fBsPmk/eTemixGPoejtbNRj+YJcmvo+Ev2G7tvpk6m/IPGki3uu5HR7S3mWaDSgcUPAwM+4p5G/Z+pyzlDpNaf5R1X2z9TtSCAwXLJSW6eUHbC3vz+eX+ha1WuexziK1U1s4/fJylLC8wCZnM7FgYsJEIGaUh2lIz6bNC3wwwtalosoY/pQPDtzYjA6MfSGXtjVrIybvh3Y9bUpiVaiDKS+w1XkHQa3RRxPSVbUTq2HgcuWM+jTbGwdQ7UsmgH9O+wlxppkZdEZt6YeVI7CIMeZbLj8GaSHbJfEhGDH+GLMjox5N3Tny49PWWS0Q1IBarQK2dibC4/wr32MaNBOG2apRUUakxeRPsm9n77rTlWKbXgArRGJMWqTBTQvUSwwWMJh5/nkArT6IGjM2+T3wjEupRy86tba8qS8DYvY5zq/rg8zf1ejWndf7JZVTF5zjHDm6nvId1nM859Hqxyyqacsl6Pozs5675X0ZTPVCzI9ng5KEOi6nFLsgMNdQ9NpGt2VZI7hFc57lsGAKSKhpLwByMyjiB5dQ7WSQgAXKlPMeV+a8xfGMLsNVpJIUzkDC0w0QMEHgggJEbtmKpBqQQbvD56m7CawebspGrTrAy5Zg0w2ekwMolY1S6ZHLn2acYTpE9whiKLqBG8lP2QhK0TBPh6NTlLKCNOat/nGHOIFoPIFI5e6raUUjf4FQ69zCpRy0j2PCaWIo7+jxuWW79Ic9kjTprCLNnCsmeq4VZsXlILOQrVlo2LTRSpW3M6vd4KXdzha9THub7L8EJqqRqyvc6eCFa14kvD7mHX4gu6E6nEW3yrVvOvktG/0Fy2eSNi5uFJb+i+x53iKxsv0HXrDGcya1xrjw9RCbaWJLvvlv7aErDxmVMlaVRphK6XT6Y2+4v4iaNs/CQeLEacx2in1089DBRYRC8p2mDqMYtVkzijkJGkF5MGAFxwSNPIRQbC8mFsYSFeiwKpjskmU92BgowCRQWFIv7sLBoJA5yF4owNOxRowELBaGhE5Oo/JXj9CxDQBQDROdQaIRFIBEg0ESCJFYoKkBnnpoDJDUognEnIfaWcfiR7Lh60R5G1j8SPX2C0R6fQ+q5eoOMDMLIDNnoOUKYFx0YSbK03leoBea4jFTly7cq1/PoYlWz5YynJvGG9mJf8AUejWo1VWpVZRU44cU2sPb+Dw95x25lTcJ1ZuOzTeunRstLJPRbL/AFL/AIxOM3h8yzph4DWvGYScfmbljK7HlXWi3832f8Ghwa3cqil0ysb7dyWXlSWvdUrictcOEemWtfHArcV0t2s95YG7flS1cW3yrdLyWvX7A3RinzNtavGWRyxVmRSM4vVty8lyr6v+CSnHpH0bk/0wFqVFrGGvjh4z6A50tlvLs8/Zk7DSuRk+i5fJPP13DUqU98lrWGPPttqOxXdCaHakW0MUo5C06KYaFIYoexI0Wx2nbZGYW+A6DZOlQK16OR6WEDlqbTMj3OC6pjjgDlAGh2AoHGgkkweH1NplWyRL4RaJgaVjsPxEbFo0YxOTqZ5lW4l4oNBFIoLBHMqJALEpBBVEwLRQVIrFBEggw5RBOI3KINxEM5ZU/iR6y0jhI87w+n8R6a3Wh6fRT47cnPfK0xeow9UUmztc4NaRWynnmj6pFLhmfC4cakX3ev8AiLbo0jP9sKUnF8snGccuDXf+D5Lxe3cpOUoY5sKcYxSTkl80caJ+B9245bKcG1vj7M+ccUtE3KKWXpstllfnkim2kfO6XCMPnjFVI7LKbSfijasrbGy6arRam7QVOK93P4V/ck8Kb6ePUIrDD5liUc5yts+np9Tb8NoC3TSytcy2aTaTeGlqXhaRx8XfmjlrK/f/AJCTyljRayWfVb9+oKTjplt/2vOHn80J1SOTrr4eSOc6PGia/kVrRxhLXOzb1a/ktK4/9eXTbGMNPw7BaVs5LX4nutFr39SVNBrLOEpa9s408DRpU1sctbV4zy6m1w7hibTloJrdEG2spdsmhR4a+qPVWFrFRWi2L1bfwLTjSubzLtsC9RG9cW+5mVqALjppWLXbJTix10DrpCaU2ScCkqI/7s5KAdBtnOmVdMan4IDNPsZgXSRzkR2afYos9haJ2z3NiETFs46m7Sjoc/UT4qcftaMQkURIukcSy0EGiisEFijAtFF0cRZBBmOINxGXEoo6iGNcOpG7TWgjYUsJGikez0+PbhHFyXdCqiVRD1VCdRF6mTrIxrn5jZuGYlxLLJZ3SmMHo8Rai4y1WWl3x0M73FNttLd65CcpxI4eTqbLp0Y8U9lavBqU3nCBvgij8vNHHZvD8x1BoVJaajcfWf2Blw/ysOvw2WHmHNnHg9wEeC8yUeWa101TPc8OSl8yTNaFtBbRSO3G903EL8bp4GPsq22+WXxavON92O2/s5yYeMdT2EkDcQ9sDurBdnGK0QvF4kjauaZlTh8QujSvRcNeUh90zP4dNJLU0lNPYvEaRuKRl3NI3asTLuY6i5DGSqBJUEP8hScSej7Z0oAKlM0akOwCdBgFmVGloUbHKlmLzoYBo3gvJAnALUyCyJTQxbxNiitDFt3qjeox0Rz89+J8PayQSKIol4o4lloIKkVii6QSunUTB1GYo4kpQ1QVxL0I6i4flGvpq20NBllLdaBZI93GeHDfZaqI15D1YybpgyuhxgNeRmVaeo1UmCI8l8K4zyWlEryjLgV5Dx8r5dcL8hZRDch1QBGFsavKz0FGeUebSNbh9boej0nN+tc/Nh9n5Io4hWcwd7mI14GZdUzbqwELqmLTRjwryUks4R6jhtVNLXJ5i5ph+G3ri8PY2OWvbXHb1kxGvAtSvE0VlWTKXKUuqUqaC8MyYS7qhuF0c6kO+XPtinbqbqRty07c01RBVoFtJ7Y1eijLuom5dowruRPI+Plm1c5KOIaZTJC1XQ9hSzI34Q2M/hdPqaqRy8+X0pgrylkiyRZROc6JFiYLYCCER3B1GYPB2mtUQgmPuA2bfYLMhD3sfUcV9lLhmRcshCeR8SNRHIwIQ5ua6i2PtblOOJCHmVdOU5ynSAZzlDWrwyEKcd1lC5em/R1RbkOkPcnpxUOcBO4pEICtGRdUhHl1OEJ1WHKNVoJ71kIebnnlL4roxksUk8npOD0fgRwh0dFd521Ln8Yw9NCdYhD0q5WNfyMG6lqQhDNbCFGysI5aOkOeqvSWFLEUNpEIcnN+R8XcFkQhIyyR1EIEHSEIFn//2Q==",
// body:"Dogs are cute!!!!"});

// blog1.save();

app.get("/",function(req,res){
    blogms.find({},function(err,blogs){
        // console.log(blogs); 
     res.render("index",{blogs:blogs});
    });

});


// blogms.find({},function(err,blogs){
//    console.log(blogs); 
// });
app.get("/new",function(req,res){
    
     res.render("new");
});


app.post("/new",function(req,res){
    // console.log(req.body.body);
    // console.log(req.sanitize(req.body.body));
    var blog1=new blogms({title:req.body.title,
        image:req.body.image,
        body:req.sanitize(req.body.body),});
        blog1.save(); 
    res.redirect("/");
});


app.get("/blog/:id",function(req,res){
    blogms.findById(req.params.id,function(err,foundblog){
    res.render("indblog",{blog:foundblog});
    });
    
});


app.get("/blog/:id/update",function(req,res){
    blogms.findById(req.params.id,function(err,foundblog){
    res.render("update",{blog:foundblog});
    });
    
});

app.put("/blog/:id",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    blogms.findByIdAndUpdate(req.params.id,req.body.blog,function(err,foundblog){
    res.redirect("/",);
    });
    
});

app.delete("/blog/:id",function(req,res){
    blogms.findByIdAndRemove(req.params.id,function(err,foundblog){
    res.redirect("/",);
    });
    
});

var server=app.listen(3000,function(){
    var port=server.address().port;
    console.log(port);
});