import { highlightText } from "@/shared/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"

interface DetailCommentProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>>
  selectedPost: any // TODO: 애니 해결하기
  searchQuery: string // TODO: 드릴
  comments: CommentItem[] // TODO: 이거 드릴링
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>> // TODO..
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      body: string
      postId: number
      userId: number
    }>
  > // TODO..
}

const DetailComment = (props: DetailCommentProps) => {
  const {
    setShowPostDetailDialog,
    showPostDetailDialog,
    selectedPost,
    searchQuery,
    comments,
    setShowAddCommentDialog,
    setNewComment,
  } = props

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>

          {/* 댓글 리스트 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>

              {/* 댓글 추가 버튼 */}
              <Button
                size="sm"
                onClick={() => {
                  setNewComment((prev) => ({ ...prev, postId: selectedPost?.id }))
                  setShowAddCommentDialog(true)
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => likeComment(comment.id, postId)}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // setSelectedComment(comment)
                        // setShowEditCommentDialog(true)
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => deleteComment(comment.id, postId)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DetailComment
