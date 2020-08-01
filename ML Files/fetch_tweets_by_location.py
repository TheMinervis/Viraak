import json
import ast
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

 
twitter_credentials = {
        'consumer_key':        'OqtfV1OveS4H7ILCdF3Ow1Zch',
        'consumer_secret':     '2zZl69X174uBXPWlbgbZ85Xj2T2EnMOkZZy4crxBUdOACfLYXd',
        'access_token_key':    '1328561335-SB45WlfJCtCA4w4hrgr25DJzf7cvFztyyU56Ama',
        'access_token_secret': 'NubLAMbrQGMfX46PfmL2FiKdMm1WbXjcLaDIcfOKj2CXk'
    }
 
consumer_key='NPOZDKAbob1tBMsDUFQ07gRAr'
consumer_secret='p0sztMBbhjzUS9ygnZk9ij5yT0lIFeOyxYZKoMBTDhL2M6Vpmy'
access_token_key='1328561335-ACXCyUvKLz8xKhvBZVy6iyy5H2OS7zjkM2Vtciz'
access_token_secret='2O7CvtFKit2LFrb4h0NhqBf0YKppuWyWmDCukl1yxlDIo'
# # # # TWITTER STREAMER # # # #



class TwitterStreamer():
    def __init__(self):
        pass

    def stream_tweets(self, fetched_tweets_filename, LOC):
        # This handles Twitter authetification and the connection to Twitter Streaming API
        listener = StdOutListener(fetched_tweets_filename)
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token_key,access_token_secret)
        stream = Stream(auth, listener,count=5)

        # This line filter Twitter Streams to capture data by the keywords: 
        stream.filter(track=LOC)


Location="Kolkata"


class StdOutListener(StreamListener):
    def __init__(self, fetched_tweets_filename):
        self.fetched_tweets_filename = fetched_tweets_filename
        

    def on_data(self, data):
        try:
            Dict = json.loads(data) 
            if loca.lower() in Dict['user']['location'].lower():
                print(Dict.text)
            with open(self.fetched_tweets_filename, 'a') as tf:
                tf.write(data)
            return True
        except BaseException as e:
            pass
        return True
          

    def on_error(self, status):
        print(status)


 
if __name__ == '__main__':
    fetched_tweets_filename = "tweets.txt"
    hash_tag_list=" "
    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets(fetched_tweets_filename, hash_tag_list)
