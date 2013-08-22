(function () {

    var assets = {

        images: {
            ground_darksand: {},
            ground_lightgrass: {},
            ground_lightgrey: {},
            ground_1: {},
            ground_2: {},
            ground_3: {},
            big_background: {},
            sprite_minotaur: {},
            decorations: {},
            crystal: {}
        },

        sounds: {
            hit1: {},
            die1: {},
            die2: {},
            die3: {},
            die4: {},
            die5: {},
            bg:{}
        },

        sprites: {
            minotaur: {}
        },

        load: function (emitter, c) {
            assets.emitter = emitter;
            assets.c = c;

            emitter.on('images-loaded', assets.createScratchCanvases);
            emitter.on('scatches-created', assets.createSprites);
            this.loadSounds();
            this.loadImages();
            
        },

        playDeathSound: function(){
            var min = 1
              , max = 5
              , ran = Math.floor(Math.random() * (max - min + 1)) + min;

              assets.sounds['die' + ran].play();           
        },

        loadSounds:function(){
            $(function(){
                assets.sounds.hit1 = document.getElementById('hit1');
                assets.sounds.die1 = document.getElementById('die1');
                assets.sounds.die2 = document.getElementById('die2');
                assets.sounds.die3 = document.getElementById('die3');
                assets.sounds.die4 = document.getElementById('die4');
                assets.sounds.die5 = document.getElementById('die5');
                assets.sounds.bg = document.getElementById('bg');

            })
        },

        loadImages: function () {
            this.images.big_background.source = new Image();
            this.images.big_background.source.src = '/public/images/canvas-background.jpg';
            this.images.big_background.source.onload = assets.imagesLoaded;


            this.images.ground_darksand.source = new Image();
            this.images.ground_darksand.source.src = '/public/images/ground-darksand_100x100.jpg';
            this.images.ground_darksand.source.onload = assets.imagesLoaded;

            this.images.ground_lightgrass.source = new Image();
            this.images.ground_lightgrass.source.src = '/public/images/ground-lightgrass_100x100.jpg';
            this.images.ground_lightgrass.source.onload = assets.imagesLoaded;

            this.images.ground_lightgrey.source = new Image();
            this.images.ground_lightgrey.source.src = '/public/images/ground-plaingrey_100x100.png';
            this.images.ground_lightgrey.source.onload = assets.imagesLoaded;

            this.images.ground_1.source = new Image();
            this.images.ground_1.source.src = '/public/images/ground-cracky1_100x100.png';
            this.images.ground_1.source.onload = assets.imagesLoaded;
            this.images.ground_1.name = 'img 1';

            this.images.ground_2.source = new Image();
            this.images.ground_2.source.src = '/public/images/ground-cracky2_100x100.png';
            this.images.ground_2.source.onload = assets.imagesLoaded;
            this.images.ground_2.name = 'img 2';

            this.images.ground_3.source = new Image();
            this.images.ground_3.source.src = '/public/images/ground-cracky3_100x100.png';
            this.images.ground_3.source.onload = assets.imagesLoaded;
            this.images.ground_3.name = 'img 3';

            this.images.sprite_minotaur.source = new Image();
            this.images.sprite_minotaur.source.src = '/public/images/sprites/minotaur.png';
            this.images.sprite_minotaur.source.onload = assets.imagesLoaded;

            this.images.decorations.source = new Image();
            this.images.decorations.source.src = '/public/images/decorations_small.png';
            this.images.decorations.source.onload = assets.imagesLoaded;

            this.images.crystal.source = new Image();
            this.images.crystal.source.src = '/public/images/crystal_small_25x50.png';
            this.images.crystal.source.onload = assets.imagesLoaded;
        },

        imagesLoaded: function () {
            assets.totalImagesLoaded = assets.totalImagesLoaded || 0;
            assets.totalImagesLoaded++;
            if (assets.totalImagesLoaded >= 10) {
                assets.emitter.trigger('images-loaded');
            }
        },

        createScratchCanvases: function () {
            var c = assets.images.ground_1.scratchCanvas.getContext('2d');
            c.clearRect(0, 0, assets.images.ground_1.scratchCanvas.width, assets.images.ground_1.scratchCanvas.height);
            c.save();
            c.scale(1, 0.5);
            c.rotate(45 * Math.PI / 180);

            var width = 100;

            c.drawImage(assets.images.ground_1.source,
                0,
                0,
                width,
                width,
                width / 2,
                (width / 2) * -1,
                width,
                width);

            c.restore();
            assets.images.ground_1.processedUrl = assets.images.ground_1.scratchCanvas.toDataURL('image/png', 1);

            //Second ground
            var c = assets.images.ground_2.scratchCanvas.getContext('2d');
            c.clearRect(0, 0, assets.images.ground_2.scratchCanvas.width, assets.images.ground_2.scratchCanvas.height);
            c.save();
            c.scale(1, 0.5);
            c.rotate(45 * Math.PI / 180);

            var width = 100;

            c.drawImage(assets.images.ground_2.source,
                0,
                0,
                width,
                width,
                width / 2,
                (width / 2) * -1,
                width,
                width);

            c.restore();
            assets.images.ground_2.processedUrl = assets.images.ground_2.scratchCanvas.toDataURL('image/png', 1);

            //Third ground
            var c = assets.images.ground_3.scratchCanvas.getContext('2d');
            c.clearRect(0, 0, assets.images.ground_3.scratchCanvas.width, assets.images.ground_3.scratchCanvas.height);
            c.save();
            c.scale(1, 0.5);
            c.rotate(45 * Math.PI / 180);

            var width = 100;

            c.drawImage(assets.images.ground_3.source,
                0,
                0,
                width,
                width,
                width / 2,
                (width / 2) * -1,
                width,
                width);

            c.restore();
            assets.images.ground_3.processedUrl = assets.images.ground_3.scratchCanvas.toDataURL('image/png', 1);


            assets.createScratchImages();
        },

        createScratchImages: function () {
            var img1 = new Image();
            img1.src = assets.images.ground_1.processedUrl;
            img1.onload = function () {
                assets.images.ground_1.processedImage = img1;
                assets.scratchCreated();
            }

            var img2 = new Image();
            img2.src = assets.images.ground_2.processedUrl;
            img2.onload = function () {
                assets.images.ground_2.processedImage = img2;
                assets.scratchCreated();
            }

            var img3 = new Image();
            img3.src = assets.images.ground_3.processedUrl;
            img3.onload = function () {
                assets.images.ground_3.processedImage = img3;
                assets.scratchCreated();
            }
        },

        scratchCreated: function () {
            assets.totalScratchesCreated = assets.totalScratchesCreated || 0;
            assets.totalScratchesCreated++;
            if (assets.totalScratchesCreated >= 3) {
                assets.emitter.trigger('scatches-created');
            }
        },

        createSprites: function () {

            assets.sprites.minotaur = new Tactics.Minotaur(assets.images.sprite_minotaur.source, assets.c);
            assets.sprites.decoration = new Tactics.DecorationSprite(assets.images.decorations.source, assets.c);

            assets.emitter.trigger('assets-loaded');
        }
    }

    Tactics.Assets = assets;

    var sizes = {
        tileHeight: 70,
        tileWidth: 140
    };

    Tactics.Assets.Sizes = sizes;

})();
