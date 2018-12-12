<template>
    <div>
        <img :src="'/img/page06-white.jpg'" v-if="status == GRAY && ! subject.absolute_url_gray" alt="gray color" />
        <img :src="'/img/page06-blue.jpg'" v-if="status == BLUE && ! subject.absolute_url_blue" alt="blue color" />
        <img :src="'/img/page06-yellow.jpg'" v-if="status == YELLOW && ! subject.absolute_url_yellow" alt="yellow color" />
        
        <img :src="subject.absolute_url_gray" v-if="status == GRAY && subject.absolute_url_gray" alt="gray color" />
        <img :src="subject.absolute_url_blue" v-if="status == BLUE && subject.absolute_url_blue" alt="blue color" />
        <img :src="subject.absolute_url_yellow" v-if="status == YELLOW && subject.absolute_url_yellow" alt="yellow color" />
        
        <div class="rating" v-if="star">
            <i class="fa fa-star" :class="s" v-for="(s, index) in stars" :key="index"></i>
        </div>
    </div>
</template>
<script>
    
    export default {
        props: ['subject', 'results', 'group', 'star'],
        data() {
            return {
                YELLOW: "yellow",
                BLUE: "blue",
                GRAY: "gray",

                status: 'gray',
                stars: [
                    'gray',
                    'gray big',
                    'gray'
                ]                
            }
        },
        methods: {
            checkCompleteTree(trees) {
                let ids = trees.map(t => t.id)
                return this.results.some(r => ids.indexOf(r.tree_id) + 1)
            },
            checkAvalibleGroup() {
                if (this.group) {
                    return this.group.every((s) => s.complete)
                }
                return true
            },
            func() {
                let avalible = this.checkAvalibleGroup()
                if (avalible) {
                    this.status = this.BLUE
                }
                
                if (this.subject.complete) {
                    this.status = 'yellow'
                    
                    this.stars = [
                        'yellow',
                        'yellow big',
                        'gray'
                    ]

                    if (this.subject.mini && this.subject.mini.length) {
                        
                        let mini = this.subject.mini.pop()
                        let matchs = this.results.filter(r => r.mini_id == mini.id)
                        
                        if (matchs.length) {
                            
                            this.stars = [
                                'yellow',
                                'yellow big',
                                'yellow'
                            ]
                        }
                        return                
                    }
                    return
                }

                if(this.checkCompleteTree(this.subject.tree)) {
                    this.stars = [
                        'yellow',
                        'gray big',
                        'gray'
                    ]
                    return 
                }
            }
        },
        watch: {
            status() {
                this.$emit('setStatus', this.status)
            },
            results() {
                this.func()
            }
        }
    }
</script>
<style lang="scss" scoped>
img {
    width: 60px;
}

.box{
        margin-bottom: 45px;
        text-align: center;
        i{
            font-size: 0.7em;
            margin: 5px 0;
        }
        .big{
            font-size: 1.1em;
            height: 16px;
            width: 16px;
        }
        .yellow{
            color: #ffb03c;
        }
        .gray{
            color: #535353;
        }
        p{
            color: #535353;
            font-family: "Roboto", sans-serif;
        margin: 0;
        font-weight: 500;
        }
        
    }
</style>

