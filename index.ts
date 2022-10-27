console.log("Hrello world");

class Guerreiros implements Defensivel {
    id: string
    description: string
    forca_atak: number
    life: number

    constructor(id: string, description: string, forca_atk: number, life: number){
        this.id = id
        this.description = description
        this.forca_atak = forca_atk
        this.life = life
    }
    estaEliminado(): boolean {
        let foiEliminado
        
        if(this.life === 0) foiEliminado = true
        else foiEliminado = false

        return foiEliminado
    }
    defenderAtak(valor_atak: number): void {
        
        if(valor_atak > this.life){
            this.life = 0
            this.estaEliminado()
            console.log("Guerreiro eliminado");
            
        }

        this.life = this.life - valor_atak
        console.log(`Combate --> Guerreiro recebeu ${valor_atak} de dano.
        \n Possui ${this.life} pontos de vida`);
        
    }

    atacar(golpe: Defensivel): void{
        golpe.defenderAtak(this.forca_atak)
    }
}

class BaseMilitar implements Defensivel {
    id: string
    local_x: string
    local_y: string
    perc_dano: number = 0

    constructor ( id: string, local_x: string, local_y: string, perc_dano: number){
        this.id = id
        this.local_x = local_x
        this.local_y = local_y
        this.perc_dano = perc_dano
    }
    estaEliminado(): boolean {
        let foiEliminado
        
        if(this.perc_dano >= 90) foiEliminado = true
        else foiEliminado = false

        return foiEliminado
    }
    defenderAtak(valor_atak: number): number {
        throw new Error("Method not implemented.");
    }
}

interface Defensivel {
    estaEliminado(): boolean
    defenderAtak(valor_atak:number): void
}

class CenariodaBatalha {
   defensiveis: Defensivel[] = []

   avaliar(defensivel_1: Defensivel[], defensivel_2: Defensivel[]){
    let eliminado_1: number = 0
    defensivel_1.forEach(objeto => {
        if (objeto.estaEliminado!) {
            eliminado_1 =+1
        }
    })

    let eliminado_2 : number = 0
    defensivel_2.forEach(objeto =>{
        if(objeto.estaEliminado!){
            eliminado_2 =+1
        }
    })
    
    if(eliminado_1 > eliminado_2){
        console.log(`O lado ${defensivel_2} ganhou!`);
        
    } else {
        console.log(`oLado ${defensivel_1} ganhou!`);
        
    }

   }
}

const peao = new Guerreiros('1','só anda pra frente',10,30)
const rei = new Guerreiros('2','lento',40,90)
const rainha = new Guerreiros('3','rapida',50,60)
const bispo = new Guerreiros('4','agil',20,50)

const casa = new BaseMilitar('11','20,norte','30,leste',70)
const batalhao = new BaseMilitar('12','40,norte','50,leste',20)
const bunker = new BaseMilitar('13','20,sul','40,oeste',0)

const batalha1 = new CenariodaBatalha()

const time1: Defensivel[] = [peao,peao,rei,rainha,casa,batalhao,bunker]
const time2: Defensivel[] = [bispo,peao,rei,rainha,casa,batalhao,bunker]

batalha1.avaliar(time1, time2)