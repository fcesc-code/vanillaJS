/* Francesc Brugarolas - Skylab bootcamp 2020-07 - challenge #GameOfLife */
'use strict';

/* CATALOGUE OF FIGURES */
export const superfigures = {
    fig_blinker(){
        this.state.board[xcenter][ycenter] = 1;
        this.state.board[xcenter - 1][ycenter] = 1;
        this.state.board[xcenter + 1][ycenter] = 1;
    },
    fig_toad(){
        this.state.board[xcenter][ycenter] = 1;
        this.state.board[xcenter - 1][ycenter] = 1;
        this.state.board[xcenter + 1][ycenter] = 1;
        this.state.board[xcenter][ycenter - 1] = 1;
        this.state.board[xcenter - 1][ycenter - 1] = 1;
        this.state.board[xcenter + 1][ycenter - 1] = 1;
    },
    fig_block(){
        this.state.board[xcenter][ycenter] = 1;
        this.state.board[xcenter - 1][ycenter] = 1;
        this.state.board[xcenter][ycenter - 1] = 1;
        this.state.board[xcenter - 1][ycenter - 1] = 1;
    },
    fig_beacon(){
        this.state.board[xcenter - 1][ycenter - 1] = 1;
        this.state.board[xcenter - 2][ycenter - 1] = 1;
        this.state.board[xcenter - 1][ycenter - 2] = 1;
        this.state.board[xcenter - 2][ycenter - 2] = 1;
        this.state.board[xcenter][ycenter] = 1;
        this.state.board[xcenter + 1][ycenter] = 1;
        this.state.board[xcenter][ycenter + 1] = 1;
        this.state.board[xcenter + 1][ycenter + 1] = 1;
    },
    fig_glider(){
        this.state.board[xcenter - 1][ycenter] = 1;
        this.state.board[xcenter][ycenter] = 1;
        this.state.board[xcenter + 1][ycenter] = 1;
        this.state.board[xcenter + 1][ycenter + 1] = 1;
        this.state.board[xcenter][ycenter + 2] = 1;
    },
    fig_pulsar(){
        this.state.board[xcenter - 2][ycenter + 1] = 1;
        this.state.board[xcenter - 3][ycenter + 1] = 1;      
        this.state.board[xcenter - 4][ycenter + 1] = 1;
        this.state.board[xcenter - 2][ycenter + 6] = 1;
        this.state.board[xcenter - 3][ycenter + 6] = 1;      
        this.state.board[xcenter - 4][ycenter + 6] = 1;    
        this.state.board[xcenter + 2][ycenter + 1] = 1;
        this.state.board[xcenter + 3][ycenter + 1] = 1;      
        this.state.board[xcenter + 4][ycenter + 1] = 1;
        this.state.board[xcenter + 2][ycenter + 6] = 1;
        this.state.board[xcenter + 3][ycenter + 6] = 1;      
        this.state.board[xcenter + 4][ycenter + 6] = 1;
        this.state.board[xcenter - 2][ycenter - 1] = 1;
        this.state.board[xcenter - 3][ycenter - 1] = 1;      
        this.state.board[xcenter - 4][ycenter - 1] = 1;
        this.state.board[xcenter - 2][ycenter - 6] = 1;
        this.state.board[xcenter - 3][ycenter - 6] = 1;      
        this.state.board[xcenter - 4][ycenter - 6] = 1;    
        this.state.board[xcenter + 2][ycenter - 1] = 1;
        this.state.board[xcenter + 3][ycenter - 1] = 1;      
        this.state.board[xcenter + 4][ycenter - 1] = 1;
        this.state.board[xcenter + 2][ycenter - 6] = 1;
        this.state.board[xcenter + 3][ycenter - 6] = 1;      
        this.state.board[xcenter + 4][ycenter - 6] = 1;
        this.state.board[xcenter - 1][ycenter + 2] = 1;
        this.state.board[xcenter - 1][ycenter + 3] = 1;
        this.state.board[xcenter - 1][ycenter + 4] = 1;   
        this.state.board[xcenter - 6][ycenter + 2] = 1;
        this.state.board[xcenter - 6][ycenter + 3] = 1;
        this.state.board[xcenter - 6][ycenter + 4] = 1;
        this.state.board[xcenter - 1][ycenter - 2] = 1;
        this.state.board[xcenter - 1][ycenter - 3] = 1;
        this.state.board[xcenter - 1][ycenter - 4] = 1;   
        this.state.board[xcenter - 6][ycenter - 2] = 1;
        this.state.board[xcenter - 6][ycenter - 3] = 1;
        this.state.board[xcenter - 6][ycenter - 4] = 1;   
        this.state.board[xcenter + 1][ycenter + 2] = 1;
        this.state.board[xcenter + 1][ycenter + 3] = 1;
        this.state.board[xcenter + 1][ycenter + 4] = 1;   
        this.state.board[xcenter + 6][ycenter + 2] = 1;
        this.state.board[xcenter + 6][ycenter + 3] = 1;
        this.state.board[xcenter + 6][ycenter + 4] = 1;
        this.state.board[xcenter + 1][ycenter - 2] = 1;
        this.state.board[xcenter + 1][ycenter - 3] = 1;
        this.state.board[xcenter + 1][ycenter - 4] = 1;   
        this.state.board[xcenter + 6][ycenter - 2] = 1;
        this.state.board[xcenter + 6][ycenter - 3] = 1;
        this.state.board[xcenter + 6][ycenter - 4] = 1;           
    }
}
